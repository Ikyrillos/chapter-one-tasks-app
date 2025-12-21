import { Colors } from '@/core/constants/theme'; // Adjust path if needed
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Task } from '../models/Task';

interface EditTaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, newTitle: string) => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ 
  visible, 
  task, 
  onClose, 
  onSave 
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (task) {
      setText(task.title);
    }
  }, [task]);

  const handleSave = () => {
    if (task && text.trim()) {
      onSave(task.id, text);
    }
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          
          {/* FIX: Use 'padding' for both platforms to force the push-up effect */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.keyboardView}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                
                <View style={styles.header}>
                  <Text style={styles.title}>Edit Task</Text>
                  <TouchableOpacity onPress={onClose} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  value={text}
                  onChangeText={setText}
                  placeholder="What needs to be done?"
                  autoFocus={true} 
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical="top"
                />

                <View style={styles.footer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


const theme = Colors.light; 

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end', 
  },
  keyboardView: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: theme.background, // #FFFFFF
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    minHeight: 250, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800', 
    color: theme.text, 
    letterSpacing: -0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border, 
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    color: theme.text, 
    backgroundColor: theme.card, 
    textAlignVertical: 'top',
    minHeight: 120,           
    maxHeight: 200,          
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16, 
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6', 
    borderWidth: 1,
    borderColor: theme.border,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: theme.primary, 
    borderRadius: 9999,
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cancelText: {
    fontSize: 16,
    color: theme.textSecondary, 
    fontWeight: '600',
  },
  saveText: {
    fontSize: 16,
    color: '#FFFFFF', 
    fontWeight: '700',
  },
});