# database/user_service.py
from datetime import datetime, timedelta
from database.config import SessionLocal
from database.models.user import User
from database.auth_utils import *

class UserService:
    def __init__(self):
        self.db = SessionLocal()
    
    def create_user(self, user_data):
        """Crear nuevo usuario en la base de datos"""
        try:
            # Verificar si el email ya existe
            existing_user = self.db.query(User).filter(User.email == user_data['email']).first()
            if existing_user:
                return {"success": False, "message": "El email ya está registrado"}
            
            # Verificar si el DNI ya existe
            existing_dni = self.db.query(User).filter(User.dni == user_data['dni']).first()
            if existing_dni:
                return {"success": False, "message": "El DNI ya está registrado"}
            
            # Generar salt y hash de contraseña
            salt = generate_salt()
            password_hash = hash_password(user_data['password'], salt)
            
            # Generar código de verificación
            codigo_verificacion = generate_verification_code()
            
            # Crear usuario
            new_user = User(
                nombre=user_data['nombre'],
                apellido=user_data['apellido'],
                email=user_data['email'],
                telefono=user_data.get('telefono'),
                dni=user_data['dni'],
                carrera_id=user_data['carrera_id'],
                año_ingreso=user_data['año_ingreso'],
                rol=user_data.get('rol', 'estudiante'),
                password_hash=password_hash,
                salt=salt,
                codigo_verificacion=codigo_verificacion,
                email_verificado=False
            )
            
            self.db.add(new_user)
            self.db.commit()
            
            return {
                "success": True, 
                "message": "Usuario creado exitosamente",
                "user_id": new_user.id,
                "codigo_verificacion": codigo_verificacion
            }
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "message": f"Error creando usuario: {str(e)}"}
        finally:
            self.db.close()
    
    def verify_email(self, email, codigo_verificacion):
        """Verificar email con código"""
        try:
            user = self.db.query(User).filter(User.email == email).first()
            if not user:
                return {"success": False, "message": "Usuario no encontrado"}
            
            if user.codigo_verificacion != codigo_verificacion:
                return {"success": False, "message": "Código de verificación incorrecto"}
            
            user.email_verificado = True
            user.codigo_verificacion = None
            user.fecha_verificacion_email = datetime.now()
            
            self.db.commit()
            return {"success": True, "message": "Email verificado exitosamente"}
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "message": f"Error verificando email: {str(e)}"}
        finally:
            self.db.close()
    
    def authenticate_user(self, email, password):
        """Autenticar usuario con email y contraseña"""
        try:
            user = self.db.query(User).filter(User.email == email).first()
            if not user:
                return {"success": False, "message": "Credenciales incorrectas"}
            
            # Verificar si la cuenta está bloqueada
            if is_account_locked(user):
                return {"success": False, "message": "Cuenta bloqueada por intentos fallidos"}
            
            # Verificar contraseña
            if not verify_password(password, user.password_hash, user.salt):
                user = increment_failed_attempts(user)
                self.db.commit()
                return {"success": False, "message": "Credenciales incorrectas"}
            
            # Resetear intentos fallidos si la contraseña es correcta
            user = reset_failed_attempts(user)
            user.fecha_ultimo_acceso = datetime.now()
            self.db.commit()
            
            return {
                "success": True, 
                "message": "Autenticación exitosa",
                "user": {
                    "id": user.id,
                    "nombre": user.nombre,
                    "apellido": user.apellido,
                    "email": user.email,
                    "rol": user.rol,
                    "carrera_id": user.carrera_id,
                    "email_verificado": user.email_verificado
                }
            }
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "message": f"Error autenticando usuario: {str(e)}"}
        finally:
            self.db.close()
    
    def request_password_reset(self, email):
        """Solicitar reset de contraseña"""
        try:
            user = self.db.query(User).filter(User.email == email).first()
            if not user:
                return {"success": False, "message": "Email no encontrado"}
            
            # Generar token de reset
            reset_token = generate_reset_token()
            user.token_reset_password = reset_token
            user.fecha_expiracion_token = datetime.now() + timedelta(hours=1)
            
            self.db.commit()
            
            return {
                "success": True, 
                "message": "Token de reset generado",
                "reset_token": reset_token
            }
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "message": f"Error generando token: {str(e)}"}
        finally:
            self.db.close()
    
    def reset_password(self, reset_token, new_password):
        """Resetear contraseña con token"""
        try:
            user = self.db.query(User).filter(
                User.token_reset_password == reset_token,
                User.fecha_expiracion_token > datetime.now()
            ).first()
            
            if not user:
                return {"success": False, "message": "Token inválido o expirado"}
            
            # Generar nuevo salt y hash
            salt = generate_salt()
            password_hash = hash_password(new_password, salt)
            
            user.password_hash = password_hash
            user.salt = salt
            user.token_reset_password = None
            user.fecha_expiracion_token = None
            
            self.db.commit()
            return {"success": True, "message": "Contraseña actualizada exitosamente"}
            
        except Exception as e:
            self.db.rollback()
            return {"success": False, "message": f"Error actualizando contraseña: {str(e)}"}
        finally:
            self.db.close()