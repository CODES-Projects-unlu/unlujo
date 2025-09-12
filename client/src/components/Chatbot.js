import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Cpu } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 ¡Hola! Soy Lujito, el asistente virtual de la comunidad estudiantil Unlu. Estoy aquí para ayudarte con cualquier consulta sobre la universidad. ¿En qué puedo asistirte?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Configurar Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const quickReplies = [
    { text: "Hola", icon: "👋" },
    { text: "Horarios", icon: "🕒" },
    { text: "Carreras", icon: "🎓" },
    { text: "Contacto", icon: "📞" },
    { text: "Ayuda", icon: "❓" }
  ];

  // Función para obtener respuesta de Gemini con búsqueda web
  const getGeminiResponse = async (message) => {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} }]
      });
      
      const prompt = `Eres Lujito, el asistente virtual de la Universidad Nacional de Luján (UNLu). 

INFORMACIÓN BASE DE UNLu:
- Universidad ubicada en Luján, Buenos Aires, Argentina
- Fundada en 1972
- Carreras disponibles: Lic. en Sistemas de Información (LSI), Lic. en Trabajo Social (LTS), Lic. en Enfermería (LE)
- Centro de Estudiantes: CODES++ (para Sistemas)
- Campus principal: Ruta 5 y Constitución, Luján, Buenos Aires

INSTRUCCIONES CRÍTICAS:
- SIEMPRE responde como Lujito, el asistente virtual de la comunidad estudiantil Unlu
- RESPUESTAS ULTRA-CORTAS: máximo 1-2 líneas, máximo 50 palabras
- Para información específica de UNLu, usa búsqueda web
- NO uses párrafos largos, NO expliques mucho
- Usa emojis, mantén tono amigable
- Si no sabes algo, di "No tengo esa info" y punto
- NO saludes en cada respuesta, solo responde directamente
- Para consultas de hora, usa la zona horaria de Argentina (GMT-3)
- EJEMPLO BUENO: "📞 El teléfono es 123-4567. ¿Algo más?"
- EJEMPLO MALO: "¡Hola! Te ayudo con gusto. El teléfono de contacto es..."

Pregunta del usuario: ${message}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Eliminar saludos repetitivos
      text = text.replace(/^(¡Hola!|Hola!|¡Hola|Hola)\s*/gi, '');
      text = text.replace(/^(👋\s*)?(¡Hola!|Hola!|¡Hola|Hola)\s*/gi, '');
      
      // Corregir zona horaria de UTC a Argentina (GMT-3)
      text = text.replace(/UTC/g, 'hora de Argentina');
      text = text.replace(/(\d{1,2}):(\d{2})\s*AM\s*UTC/gi, (match, hour, minute) => {
        const argentinaHour = (parseInt(hour) - 3 + 24) % 24;
        return `${argentinaHour}:${minute} AM hora de Argentina`;
      });
      text = text.replace(/(\d{1,2}):(\d{2})\s*PM\s*UTC/gi, (match, hour, minute) => {
        const argentinaHour = (parseInt(hour) - 3 + 12) % 12;
        return `${argentinaHour}:${minute} PM hora de Argentina`;
      });
      
      // Forzar respuestas más cortas - cortar si es muy largo
      if (text.length > 200) {
        const sentences = text.split('.');
        text = sentences.slice(0, 2).join('.') + '.';
      }
      
      return text;
    } catch (error) {
      console.error('Error con Gemini:', error);
      return "❌ Error. Intenta de nuevo.";
    }
  };

  // Scroll automático al final de los mensajes
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }, 100);
  };

  // Efecto de scroll cuando se agregan mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Scroll adicional durante la escritura
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(scrollToBottom, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

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
        // Scroll durante la escritura cada 15 caracteres
        if (index % 15 === 0) {
          scrollToBottom();
        }
      } else {
        clearInterval(interval);
        // Scroll final cuando termina de escribir
        scrollToBottom();
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

    // Obtener respuesta de Gemini
    try {
      const botResponse = await getGeminiResponse(messageToSend);
      
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
    } catch (error) {
      console.error('Error obteniendo respuesta:', error);
      setIsTyping(false);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const errorMessage = {
          id: Date.now() + 2,
          text: "Lo siento, hubo un error al procesar tu consulta. ¿Podrías intentar de nuevo?",
          isBot: true
        };
        return [...withoutTyping, errorMessage];
      });
    }
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
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col">
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
          <div ref={messagesContainerRef} className="messages-container flex-1 p-4 overflow-y-auto space-y-3 min-h-0 scroll-smooth" style={{scrollBehavior: 'smooth'}}>
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
          <div className="px-2 py-1.5 border-t bg-gray-50 w-full">
            <div className="flex flex-nowrap gap-1 overflow-x-auto scrollbar-hide w-full">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.text)}
                  className="quick-reply-button flex items-center space-x-0.5 px-1.5 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-xs">{reply.icon}</span>
                  <span className="text-xs">{reply.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
