import { Colors } from '@/core/constants/theme';
import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../models/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => onEdit(task)}>
        <Ionicons name="pencil-outline" size={24} color="#2196F3" style={
          { marginRight: 12}
        } />
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => onToggle(task.id)}
      >
        <Ionicons
          name={task.isCompleted ? "checkbox" : "square-outline"}
          size={24}
          color={task.isCompleted ? "#4CAF50" : "#666"}
        />
        <Text style={[styles.text, task.isCompleted && styles.textCompleted]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
};


const theme = Colors.light;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.background, // #FFFFFF
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    
    // "Floating" Card Shadow
    borderWidth: 1,
    borderColor: theme.border, 
    shadowColor: '#0000005b',
    shadowOpacity: 0.02,
    shadowRadius:4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, 
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14, 
  },
  text: {
    fontSize: 16,
    fontWeight: '500', 
    color: theme.text, 
    lineHeight: 22,
    flex: 1, 
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: theme.tabIconDefault,
    fontStyle: 'italic', 
    opacity: 0.8, 
  },
  deleteButton: {
    padding: 10, 
    backgroundColor: '#FEF2F2', 
    borderRadius: 12, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});