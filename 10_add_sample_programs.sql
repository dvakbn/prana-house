-- Add sample programs for Prana House
-- Run this in Supabase SQL Editor after creating the programs table

-- 1. Breathing Exercises Program
INSERT INTO programs (
  name,
  slug,
  category,
  icon,
  tagline,
  description,
  long_description,
  benefits,
  what_included,
  duration,
  schedule,
  location,
  price,
  max_participants,
  level,
  type,
  tags,
  upcoming_dates,
  active
) VALUES (
  'Breathing Exercises & Pranayama',
  'breathing-exercises',
  'Pranayama',
  '🌬️',
  'Master the art of breath for vitality and calm',
  'A comprehensive pranayama program teaching foundational to advanced breathing techniques for energy, clarity and emotional balance.',
  'Breathing is the bridge between body and mind. This program teaches you the ancient science of pranayama — conscious breath control that influences your nervous system, emotional state and energy levels. You''ll learn techniques ranging from calming breathwork for stress relief to energizing practices that boost vitality. Each session includes theory, guided practice, and time for integration. Perfect for anyone seeking better stress management, improved focus, or deeper meditation.',
  ARRAY[
    'Reduce stress and anxiety naturally',
    'Improve lung capacity and respiratory health',
    'Better focus and mental clarity',
    'Balance your nervous system',
    'Prepare for deeper meditation practice',
    'Learn to regulate emotions through breath'
  ],
  ARRAY[
    'Weekly live guided pranayama sessions',
    'Nadi Shodhana (Alternate Nostril Breathing)',
    'Kapalbhati (Skull Shining Breath)',
    'Bhramari (Humming Bee Breath)',
    'Ujjayi (Victorious Breath)',
    'Anulom Vilom and Bhastrika techniques',
    'Digital practice guide with illustrations',
    'Recorded sessions for home practice',
    'Personalized breath assessment',
    'WhatsApp support for technique corrections'
  ],
  '6 Weeks',
  'Tuesday & Thursday, 7:00 - 7:45 PM',
  'Online & Offline (Pratap Nagar, Jaipur)',
  2500,
  15,
  'all',
  'hybrid',
  ARRAY['pranayama', 'breathing', 'stress-relief', 'energy', 'wellness'],
  ARRAY['2026-07-08', '2026-08-05', '2026-09-02']::date[],
  true
);

-- 2. Flexibility Training Program
INSERT INTO programs (
  name,
  slug,
  category,
  icon,
  tagline,
  description,
  long_description,
  benefits,
  what_included,
  duration,
  schedule,
  location,
  price,
  max_participants,
  level,
  type,
  tags,
  upcoming_dates,
  active
) VALUES (
  'Flexibility & Mobility Training',
  'flexibility-training',
  'Yoga',
  '🤸',
  'Build strength, flexibility and freedom of movement',
  'A progressive flexibility program combining yoga asanas, stretching techniques and mobility work to improve range of motion and prevent injury.',
  'Flexibility isn''t about touching your toes — it''s about building a body that moves freely, without pain or restriction. This program uses yoga asanas, dynamic stretching and targeted mobility work to systematically improve your flexibility. Each week targets different muscle groups: hips, hamstrings, shoulders, spine. You''ll learn the difference between active and passive flexibility, how to stretch safely, and how to build strength within your new range of motion. Perfect for athletes, desk workers, or anyone feeling stiff and restricted.',
  ARRAY[
    'Improve range of motion and joint mobility',
    'Reduce muscle tension and stiffness',
    'Better posture and body alignment',
    'Injury prevention for daily activities',
    'Enhanced athletic performance',
    'Relief from back, neck and shoulder pain',
    'Build strength alongside flexibility'
  ],
  ARRAY[
    'Twice-weekly progressive flexibility sessions',
    'Hip opening sequences',
    'Hamstring and forward fold practices',
    'Shoulder and upper body mobility',
    'Spinal flexibility and twists',
    'Dynamic stretching techniques',
    'PNF (Proprioceptive Neuromuscular Facilitation) methods',
    'Video library for home practice',
    'Personalized flexibility assessment',
    'Monthly progress tracking'
  ],
  '8 Weeks',
  'Monday & Friday, 6:30 - 7:30 AM',
  'Online & Offline (Pratap Nagar, Jaipur)',
  3500,
  12,
  'beginner',
  'hybrid',
  ARRAY['flexibility', 'mobility', 'stretching', 'yoga', 'injury-prevention'],
  ARRAY['2026-07-07', '2026-08-11', '2026-09-08']::date[],
  true
);

-- 3. Stress Relief & Wellness Program
INSERT INTO programs (
  name,
  slug,
  category,
  icon,
  tagline,
  description,
  long_description,
  benefits,
  what_included,
  duration,
  schedule,
  location,
  price,
  max_participants,
  level,
  type,
  tags,
  upcoming_dates,
  active
) VALUES (
  'Stress Relief & Mental Wellness',
  'stress-relief',
  'Wellness',
  '🌿',
  'Find calm, clarity and balance in daily life',
  'A holistic stress management program combining yoga, breathwork, meditation and naturopathic lifestyle practices for lasting mental wellness.',
  'Modern life is demanding — this program gives you practical tools to navigate stress with grace. Over 4 weeks, you''ll learn a complete stress management toolkit: calming breathwork for acute anxiety, gentle restorative yoga for nervous system regulation, guided meditations for mental clarity, and naturopathic lifestyle adjustments for sustained wellbeing. Dr. Fareen Tak draws from yoga therapy, naturopathy and counseling to create a scientifically-grounded yet deeply compassionate approach to stress. You''ll leave with daily practices you can maintain for life.',
  ARRAY[
    'Manage stress and anxiety effectively',
    'Better sleep quality and deeper rest',
    'Emotional regulation and resilience',
    'Reduced physical tension and pain',
    'Improved focus and productivity',
    'Tools for burnout prevention',
    'Greater sense of peace and wellbeing'
  ],
  ARRAY[
    'Weekly live stress relief sessions',
    'Restorative yoga practices',
    'Yoga Nidra deep relaxation',
    'Guided meditations for anxiety',
    'Calming breathwork techniques',
    'Naturopathic lifestyle consultation',
    'Sleep hygiene guidance',
    'Stress assessment and personalized plan',
    'Daily practice recordings',
    'WhatsApp support between sessions',
    'Journal prompts for self-reflection'
  ],
  '4 Weeks',
  'Wednesday & Saturday, 7:30 - 8:30 PM',
  'Online & Offline (Pratap Nagar, Jaipur)',
  4000,
  10,
  'all',
  'hybrid',
  ARRAY['stress-relief', 'mental-health', 'meditation', 'relaxation', 'wellness', 'yoga-nidra'],
  ARRAY['2026-07-09', '2026-08-06', '2026-09-03']::date[],
  true
);

-- Verify insertion
SELECT name, slug, price, active FROM programs ORDER BY created_at DESC;
