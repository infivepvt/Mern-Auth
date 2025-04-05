import React, { useState, useEffect, useRef } from 'react';

const formStructure = [
  {
    key: 'firstName',
    question: 'Let\'s start with your first name:',
    type: 'text',
    placeholder: 'John'
  },
  {
    key: 'lastName',
    question: 'And your last name:',
    type: 'text',
    placeholder: 'Doe'
  },
  {
    key: 'email',
    question: 'What\'s your email address?',
    type: 'email',
    placeholder: 'john.doe@example.com'
  },
  {
    key: 'phone',
    question: 'Please share your phone number:',
    type: 'tel',
    placeholder: '(123) 456-7890'
  },
  {
    key: 'problemType',
    question: 'What type of issue are you experiencing?',
    type: 'multiple-choice',
    options: ['New Order', 'Delivery', 'Billing', 'Other']
  },
  {
    key: 'description',
    question: 'Please describe your issue in detail:',
    type: 'textarea',
    placeholder: 'Type your message here...'
  },
  {
    key: 'urgency',
    question: 'How urgent is this matter?',
    type: 'multiple-choice',
    options: ['Today', 'Next 48 hours', 'This week', 'Not urgent']
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatVisible, currentStep]);

  const startChat = () => {
    setChatVisible(true);
    setMessages([{
      text: '👋 Hello! I\'ll help you fill out the support form. Let\'s start!, Please give me your first name:',
      sender: 'bot'
    }]);
    setCurrentStep(0);
    setFormData({});
  };

  const handleResponse = (value) => {
    const currentField = formStructure[currentStep];
    
    if (currentField.type === 'multiple-choice' && !currentField.options[value]) {
      setMessages(prev => [...prev, {
        text: '⚠️ Please select a valid option',
        sender: 'bot'
      }]);
      return;
    }

    const answer = currentField.type === 'multiple-choice' 
      ? currentField.options[value] 
      : value;

    setFormData(prev => ({ ...prev, [currentField.key]: answer }));
    setMessages(prev => [...prev, { text: answer, sender: 'user' }]);

    if (currentStep < formStructure.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: formStructure[currentStep + 1].question,
          sender: 'bot' 
        }]);
      }, 500);
    } else {
      setCurrentStep(formStructure.length);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: '✅ All done! Ready to review your form?',
          sender: 'bot' 
        }]);
      }, 500);
    }
  };

  const handleSubmit = () => {
    const message = `📋 *New Support Request* 📋
    
*Personal Information:*
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email || 'N/A'}
📞 Phone: ${formData.phone || 'N/A'}

*Issue Details:*
🔧 Issue Type: ${formData.problemType}
📝 Description: ${formData.description}
⏰ Urgency: ${formData.urgency}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setMessages([]);
    setChatVisible(false);
  };

  const renderInputField = () => {
    const currentField = formStructure[currentStep];
    
    if (currentField.type === 'multiple-choice') {
      return (
        <div style={styles.choiceButtons}>
          {currentField.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleResponse(index)}
              style={styles.choiceButton}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <input
        ref={inputRef}
        type={currentField.type}
        placeholder={currentField.placeholder}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            handleResponse(e.target.value);
            e.target.value = '';
          }
        }}
        style={styles.inputField}
      />
    );
  };

  const FormPreview = () => (
    <div style={styles.formPreview}>
      <h2 style={styles.previewTitle}>Support Request Summary</h2>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Personal Information</h3>
        <p style={styles.previewItem}><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
        <p style={styles.previewItem}><strong>Email:</strong> {formData.email}</p>
        <p style={styles.previewItem}><strong>Phone:</strong> {formData.phone}</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Issue Details</h3>
        <p style={styles.previewItem}><strong>Issue Type:</strong> {formData.problemType}</p>
        <p style={styles.previewItem}><strong>Description:</strong> {formData.description}</p>
        <p style={styles.previewItem}><strong>Urgency:</strong> {formData.urgency}</p>
      </div>

      <div style={styles.buttonGroup}>
        <button 
          style={styles.secondaryButton}
          onClick={() => setShowForm(false)}
        >
          Close Preview
        </button>
        <button 
          style={styles.primaryButton}
          onClick={handleSubmit}
        >
          📱 Submit via WhatsApp
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.appContainer}>
      {!chatVisible && (
        <button 
          style={styles.chatButton}
          onClick={startChat}
        >
          🗨️ 
        </button>
      )}

      {chatVisible && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <h3 style={styles.chatTitle}>Form Assistant</h3>
            <button
              style={styles.closeButton}
              onClick={() => setChatVisible(false)}
            >
              ×
            </button>
          </div>

          <div style={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage)
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {currentStep < formStructure.length ? (
            <div style={styles.inputContainer}>
              {renderInputField()}
              <p style={styles.helperText}>
                {formStructure[currentStep].type === 'multiple-choice' 
                  ? 'Please select an option' 
                  : 'Press Enter to submit'}
              </p>
            </div>
          ) : (
            <div style={styles.completionButtons}>
              <button
                style={styles.primaryButton}
                onClick={() => setShowForm(true)}
              >
                📝 Review Form
              </button>
              <button
                style={styles.secondaryButton}
                onClick={startChat}
              >
                🔄 Start Over
              </button>
            </div>
          )}
        </div>
      )}

      {showForm && <FormPreview />}
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: '100%',
    minHeight: '100vh',
    padding: '10px',
  },
  chatButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1000,
    '@media (max-width: 480px)': {
      bottom: '10px',
      right: '10px',
      fontSize: '12px',
      padding: '10px 16px',
    },
  },
  chatContainer: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    width: '100%',
    maxWidth: '400px',
    height: '80vh',
    backgroundColor: 'white',
    borderRadius: '15px 15px 0 0',
    boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    '@media (max-width: 480px)': {
      width: '100%',
      height: '90vh',
      maxWidth: 'none',
      borderRadius: '0',
    },
  },
  chatHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      padding: '12px',
    },
  },
  chatTitle: {
    margin: 0,
    fontSize: '1.2rem',
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 8px',
    '@media (max-width: 480px)': {
      fontSize: '20px',
    },
  },
  messagesContainer: {
    height: 'calc(100% - 150px)',
    overflowY: 'auto',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    '@media (max-width: 480px)': {
      padding: '10px',
      height: 'calc(100% - 130px)',
    },
  },
  message: {
    maxWidth: '85%',
    padding: '10px 15px',
    marginBottom: '12px',
    borderRadius: '15px',
    lineHeight: '1.4',
    fontSize: '14px',
    '@media (max-width: 480px)': {
      maxWidth: '90%',
      fontSize: '12px',
      padding: '8px 12px',
    },
  },
  botMessage: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    marginRight: 'auto',
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginLeft: 'auto',
  },
  inputContainer: {
    padding: '10px',
    borderTop: '1px solid #eee',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '8px',
    '@media (max-width: 480px)': {
      padding: '8px',
      fontSize: '12px',
    },
  },
  choiceButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  choiceButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '@media (max-width: 480px)': {
      padding: '10px',
      fontSize: '12px',
    },
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  helperText: {
    color: '#666',
    fontSize: '12px',
    margin: '5px 0 0',
    textAlign: 'right',
  },
  completionButtons: {
    display: 'flex',
    gap: '10px',
    padding: '15px',
    borderTop: '1px solid #eee',
    '@media (max-width: 480px)': {
      padding: '10px',
    },
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '@media (max-width: 480px)': {
      padding: '10px 15px',
      fontSize: '12px',
    },
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '@media (max-width: 480px)': {
      padding: '10px 15px',
      fontSize: '12px',
    },
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
  },
  formPreview: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '500px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    zIndex: 2000,
    '@media (max-width: 480px)': {
      padding: '15px',
    },
  },
  previewTitle: {
    color: '#4CAF50',
    margin: '0 0 15px',
    fontSize: '1.2rem',
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    color: '#666',
    fontSize: '1rem',
    margin: '0 0 10px',
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },
  previewItem: {
    margin: '8px 0',
    lineHeight: '1.5',
    fontSize: '14px',
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
    },
  },
};

export default App;