# database/auth_utils.py
import hashlib
import secrets
import string
from datetime import datetime, timedelta

def generate_salt():
    """Generar un salt aleatorio para el hash de la contraseña"""
    return secrets.token_hex(32)

def hash_password(password, salt):
    """Crear hash de la contraseña con salt"""
    return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000).hex()

def verify_password(password, hashed_password, salt):
    """Verificar si la contraseña es correcta"""
    return hash_password(password, salt) == hashed_password

def generate_verification_code():
    """Generar código de verificación de 6 dígitos"""
    return ''.join(secrets.choice(string.digits) for _ in range(6))

def generate_reset_token():
    """Generar token para resetear contraseña"""
    return secrets.token_urlsafe(32)

def is_account_locked(user):
    """Verificar si la cuenta está bloqueada por intentos fallidos"""
    if user.bloqueado_hasta and user.bloqueado_hasta > datetime.now():
        return True
    return False

def lock_account(user, minutes=30):
    """Bloquear cuenta por intentos fallidos"""
    user.bloqueado_hasta = datetime.now() + timedelta(minutes=minutes)
    user.intentos_fallidos = 0
    return user

def increment_failed_attempts(user):
    """Incrementar contador de intentos fallidos"""
    user.intentos_fallidos += 1
    if user.intentos_fallidos >= 5:
        user = lock_account(user)
    return user

def reset_failed_attempts(user):
    """Resetear contador de intentos fallidos"""
    user.intentos_fallidos = 0
    user.bloqueado_hasta = None
    return user