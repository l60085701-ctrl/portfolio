
import React from 'react';
import { Project, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'book-system',
    title: 'Object-Oriented Book Management System',
    subtitle: 'Functional Desktop Application',
    goal: 'Create a robust desktop application for managing library inventory using advanced software engineering principles.',
    description: 'A comprehensive software solution built with C# that leverages Object-Oriented Programming (OOP) to handle library operations efficiently.',
    tags: ['Software', 'C#', 'OOP'],
    tech: ['C#', 'Visual Studio', '.NET', 'File I/O'],
    skills: [
      'Encapsulation: Securely managing book attributes.',
      'Inheritance: Extending base classes for specialized media types.',
      'Polymorphism: Implementing dynamic search algorithms.',
      'Data Persistence: Handling local storage through file systems.'
    ],
    implementation: [
      'Engineered a "Book" class to encapsulate attributes like ISBN, Title, and Author.',
      'Developed a "LibraryManager" controller class to manage CRUD operations.',
      'Implemented search functionality using efficient filtering logic.',
      'Integrated file-based data persistence for reliability.'
    ],
    results: 'Created a modular, maintainable code base that allows for easy future scaling and demonstrates a deep understanding of software design patterns.',
    image: 'https://picsum.photos/seed/books/800/600'
  },
  {
    id: 'smart-home',
    title: 'ESP32-Based IoT Smart Home System',
    subtitle: 'Embedded IoT Solution',
    goal: 'Develop an integrated hardware-software system to monitor and control home environments remotely.',
    description: 'An end-to-end IoT platform utilizing ESP32 microcontrollers and various sensors to automate home security and lighting.',
    tags: ['IoT', 'Embedded', 'Hardware'],
    tech: ['ESP32', 'C++', 'Blynk IoT', 'Arduino IDE'],
    skills: [
      'Embedded C++: Low-level programming of microcontrollers.',
      'Cloud Integration: Interfacing hardware with Blynk cloud services.',
      'Sensor Integration: Working with LDR and IR hardware.',
      'Actuator Control: Controlling Servo motors for physical automation.'
    ],
    implementation: [
      'Configured ESP32 as the central controller hub.',
      'Integrated LDR (Photoresistor) to automate external lighting based on ambient levels.',
      'Deployed IR Sensors for motion detection and security alerting.',
      'Implemented Servo Motors to simulate smart door locking mechanisms.',
      'Created a remote dashboard using the Blynk mobile application for real-time status monitoring.'
    ],
    results: 'Successful deployment of a prototype that reduces energy consumption through automation and enhances security through remote monitoring.',
    image: 'https://picsum.photos/seed/smarthome/800/600'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    skills: ['C#', 'C/C++', 'Python', 'Java', 'SQL'],
    icon: 'Terminal'
  },
  {
    name: 'Embedded Systems',
    skills: ['ESP32', 'Arduino', 'Microcontrollers', 'Sensors (LDR, IR)', 'Servos'],
    icon: 'Cpu'
  },
  {
    name: 'Concepts',
    skills: ['OOP', 'Data Structures', 'Algorithms', 'IoT Architectures'],
    icon: 'LayoutGrid'
  },
  {
    name: 'Tools & OS',
    skills: ['Visual Studio', 'Git/GitHub', 'Blynk App', 'Windows', 'Linux'],
    icon: 'Tool'
  }
];
