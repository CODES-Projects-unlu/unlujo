import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Cpu } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 ¡Hola! Soy Lujito, tu robot asistente de UNLujo. Estoy aquí para ayudarte con cualquier consulta sobre la comunidad estudiantil. ¿En qué puedo asistirte?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const quickReplies = [
    { text: "Hola", icon: "👋" },
    { text: "Horarios", icon: "🕒" },
    { text: "Carreras", icon: "🎓" },
    { text: "Contacto", icon: "📞" },
    { text: "Comunidad", icon: "👥" },
    { text: "UNLujo", icon: "🏛️" },
    { text: "Robot", icon: "🤖" },
    { text: "Ayuda", icon: "❓" }
  ];

  // Respuestas predefinidas del chatbot
  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('hola') || msg.includes('hi') || msg.includes('buenas')) {
      return "¡Hola! 👋 Soy Lujito, tu asistente virtual de UNLujo. Estoy aquí para ayudarte con información sobre la universidad, carreras, horarios y más. ¿En qué puedo asistirte?";
    }
    
    if (msg.includes('horario') || msg.includes('horarios')) {
      return "📅 Los horarios de atención de la universidad son:\n• Lunes a Viernes: 8:00 - 18:00\n• Sábados: 8:00 - 12:00\n• Secretaría Académica: 8:00 - 16:00\n• Biblioteca: 8:00 - 20:00";
    }
    
    if (msg.includes('carrera') || msg.includes('carreras') || msg.includes('estudiar')) {
      return "🎓 En UNLujo tenemos 3 carreras principales:\n\n• **Lic. en Sistemas de Información (LSI)**\n• **Lic. en Trabajo Social (LTS)**\n• **Lic. en Enfermería (LE)**\n\n¡Puedes explorar cada una en la página principal!";
    }
    
    if (msg.includes('contacto') || msg.includes('telefono') || msg.includes('email')) {
      return "📞 **Información de Contacto:**\n\n• Email: centroestudiantes@unlujo.edu.ar\n• Teléfono: (011) 1234-5678\n• Dirección: Ruta 5 y Avenida Constitución, Luján\n• Horarios: Lunes a Viernes 8:00 - 18:00";
    }
    
    if (msg.includes('comunidad') || msg.includes('estudiantes') || msg.includes('codes')) {
      return "👥 **Comunidad Estudiantil:**\n\n• **CODES++** - Centro de Estudiantes de Sistemas\n• Eventos y actividades estudiantiles\n• Grupos de estudio y hackathons\n• Recursos académicos compartidos\n\n¡Únete a nuestra comunidad activa!";
    }
    
    if (msg.includes('unlujo') || msg.includes('universidad') || msg.includes('unlu')) {
      return "🏛️ **Universidad Nacional de Luján (UNLu):**\n\n• Fundada en 1972\n• Ubicada en Luján, Buenos Aires\n• Carreras de grado y posgrado\n• Investigación y extensión universitaria\n• Comunidad estudiantil activa y comprometida";
    }
    
    if (msg.includes('ayuda') || msg.includes('help') || msg.includes('soporte')) {
      return "❓ **¿Necesitas ayuda?**\n\nPuedo ayudarte con:\n• Información sobre carreras\n• Horarios de atención\n• Datos de contacto\n• Eventos y actividades\n• Recursos académicos\n\n¡Solo pregunta! 😊";
    }
    
    if (msg.includes('gracias') || msg.includes('thanks')) {
      return "¡De nada! 😊 Me alegra poder ayudarte. Si tienes más preguntas, no dudes en consultarme. ¡Estoy aquí para asistirte!";
    }
    
    // Respuesta por defecto
    return "🤔 Interesante pregunta. Aunque soy un asistente básico, puedo ayudarte con información sobre:\n\n• Carreras disponibles\n• Horarios de atención\n• Información de contacto\n• Eventos estudiantiles\n\n¿Hay algo específico que te gustaría saber?";
  };

  // Scroll automático al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efecto de scroll cuando se agregan mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Efecto de escritura para mensajes del bot
  const typeMessage = (text, messageId) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, text: text.substring(0, index + 1) }
              : msg
          )
        );
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Velocidad de escritura más rápida
  };

  const handleSendMessage = async (messageText = null) => {
    const messageToSend = messageText || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageToSend,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Mostrar indicador de escritura
    setIsTyping(true);
    const typingMessage = {
      id: Date.now() + 1,
      text: "",
      isBot: true,
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simular delay de respuesta
    setTimeout(() => {
      const botResponse = getBotResponse(messageToSend);
      
      // Remover mensaje de escritura y agregar respuesta real
      setIsTyping(false);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const botMessage = {
          id: Date.now() + 2,
          text: botResponse,
          isBot: true
        };
        return [...withoutTyping, botMessage];
      });

      // Iniciar efecto de escritura
      setTimeout(() => {
        typeMessage(botResponse, Date.now() + 2);
      }, 500);
    }, 1000); // Simular 1 segundo de "procesamiento"
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickReply = (replyText) => {
    // Efecto de vibración sutil
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    handleSendMessage(replyText);
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="animate-pulse relative"
          aria-label="Abrir chatbot"
        >
          <div className="relative">
            <Bot className="w-16 h-16 text-blue-600 hover:text-blue-800 transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Lujito</h3>
                <p className="text-xs opacity-90 flex items-center">
                  <Cpu className="w-3 h-3 mr-1" />
                  Robot Asistente
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="messages-container flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} message-enter`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex items-center space-x-1">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="text-sm text-gray-500">Lujito está escribiendo...</span>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.text)}
                  className="quick-reply-button flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <span>{reply.icon}</span>
                  <span>{reply.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
