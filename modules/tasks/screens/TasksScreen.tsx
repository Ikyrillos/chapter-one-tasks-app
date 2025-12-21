import { TaskItem } from '@/modules/tasks/components/TaskItem';
import { useTaskController } from '@/modules/tasks/hooks/useTaskController';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import type { Task } from '@/modules/tasks/models/Task';
import { EditTaskModal } from '../components/EditTaskModal';

export default function TasksScreen() {
  const { tasks, addTask, deleteTask, toggleTaskCompletion, updateTask } = useTaskController();
  
  const [inputText, setInputText] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleAddTask = () => {
    addTask(inputText);
    setInputText(''); 
    Keyboard.dismiss(); 
  };

  const handleEditPress = (task: Task) => {
    setTaskToEdit(task);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (id: string, newTitle: string) => {
    updateTask(id, newTitle);
    setEditModalVisible(false);
    setTaskToEdit(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} 
      >
        
        <View style={styles.header}>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>{tasks.filter(t => !t.isCompleted).length} pending</Text>
        </View>

        <View style={styles.content}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TaskItem 
                task={item} 
                onToggle={toggleTaskCompletion} 
                onDelete={deleteTask} 
                onEdit={handleEditPress}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyIconContainer}>
                  <Icon name="check-circle-o" size={80} color="#e6b7b2ff" />
                </View>
                <Text style={styles.emptyTitle}>All Clear!</Text>
                <Text style={styles.emptyText}>You have no tasks at the moment.</Text>
                <Text style={styles.emptySubtext}>Tap the + button below to get started</Text>
              </View>
            }
          />
        </View>

        {/* Input Area is now INSIDE the main wrapper */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a task"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity 
              onPress={handleAddTask} 
              style={[styles.addButton, !inputText.trim() && styles.addButtonDisabled]}
              disabled={!inputText.trim()}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>

      <EditTaskModal 
        visible={isEditModalVisible}
        task={taskToEdit}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24, 
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', 
  },
  title: {
    fontSize: 32, 
    fontWeight: '800', 
    color: '#111827', 
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563', 
    marginTop: 8,
    lineHeight: 22,
  },
  content: {
    flex: 1, 
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyState: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    marginBottom: 24,
    opacity: 0.9,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptySubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 12,
    textAlign: 'center',
  },
  inputWrapper: {
    padding: 24,
    backgroundColor: '#FFFFFF', 
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', 
    borderRadius: 50, 
    paddingRight: 6,
    paddingLeft: 24,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48, // Taller touch target
    fontSize: 16,
    color: '#1F2937',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#EF4444', // Brand Red
    borderRadius: 9999, // Circle
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444', // Colored shadow glow
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addButtonDisabled: {
    opacity: 0.7,
    shadowOpacity: 0,
    elevation: 0,
  },
});