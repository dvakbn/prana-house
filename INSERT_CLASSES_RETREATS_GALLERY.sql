-- Classes, Retreats, and Gallery ONLY
-- Simple and clean - will work!

INSERT INTO classes (name, type, level, schedule, duration, price, description, max_students, active) VALUES
('Morning Hatha Yoga Online', 'online', 'all', 'Mon, Wed, Fri - 6:30 to 7:30 AM', 60, 2000, 
'Start your day with traditional Hatha Yoga from the comfort of home. This gentle yet invigorating practice combines asanas, pranayama, and meditation. Perfect for building a consistent morning practice. Small group size ensures personal attention and adjustments. Includes recorded sessions for makeup classes.', 
12, true),
('Evening Relaxation Flow Online', 'online', 'all', 'Tue, Thu - 7:00 to 8:00 PM', 60, 1800,
'Unwind after work with this calming flow designed to release tension and prepare for restful sleep. Combines gentle vinyasa, restorative poses, and Yoga Nidra. Ideal for stress management and better sleep quality. Suitable for complete beginners.',
15, true),
('Pranayama & Meditation Online', 'online', 'all', 'Daily - 6:00 to 6:45 AM', 45, 1500,
'Daily morning breathwork and meditation practice. Learn traditional pranayama techniques and guided meditation. Builds mental clarity, emotional balance, and respiratory health. Join live or access recordings. Perfect for establishing a daily spiritual practice.',
20, true),
('Sunrise Yoga - Offline', 'offline', 'all', 'Mon, Wed, Fri - 6:00 to 7:15 AM', 75, 3000,
'Experience yoga in person at Prana House, Pratap Nagar. Complete morning sadhana including pranayama, asana, and meditation. Personalized adjustments and hands-on corrections. Build community with fellow practitioners. Tea and light refreshments included.',
8, true),
('Therapeutic Yoga - Offline', 'offline', 'beginner', 'Tue, Thu - 9:00 to 10:15 AM', 75, 3500,
'Specialized class for chronic pain, injury recovery, or limited mobility. One-on-one attention within a small group setting. Uses props, chair yoga, and gentle modifications. Combines yoga therapy principles with naturopathic guidance.',
6, true),
('Power Vinyasa - Offline', 'offline', 'intermediate', 'Tue, Thu, Sat - 6:00 to 7:15 PM', 75, 2800,
'Dynamic, flowing sequences linking breath with movement. Builds strength, stamina, and flexibility. Expect inversions, arm balances, and challenging transitions. Suitable for those with consistent yoga practice. High-energy class with detailed alignment cues.',
10, true),
('Flexibility & Mobility', 'hybrid', 'all', 'Saturday - 7:00 to 8:30 AM', 90, 2500,
'Deep stretch and mobility work. Focuses on hip openers, hamstring flexibility, shoulder mobility, and spinal health. Join online or offline. Includes myofascial release techniques and props work. Perfect complement to strength training or desk work.',
12, true),
('Yoga for Stress Relief', 'hybrid', 'all', 'Sunday - 5:00 to 6:30 PM', 90, 2200,
'Weekly restorative practice combining gentle asanas, breathwork, and guided relaxation. Learn practical stress management tools. Includes Yoga Nidra (yogic sleep) and mindfulness techniques. Supportive, nurturing environment.',
15, true);


INSERT INTO retreats (title, start_date, end_date, location, price, max_participants, description, highlights, image, schedule, active) VALUES
('Full Day Yoga & Wellness Retreat', '2026-08-15', '2026-08-15', 'Prana House, Pratap Nagar, Jaipur', 5000, 20,
'Immerse yourself in a transformative day of yoga, meditation, wellness workshops, and sattvic nourishment. Disconnect from daily stress and reconnect with your inner self. Led by Dr. Fareen Tak with personalized attention throughout.',
ARRAY[
  'Complete yoga & pranayama sessions',
  'Sattvic breakfast & wholesome lunch',
  'Wellness workshop on yogic lifestyle',
  'Yoga Nidra deep relaxation',
  'All mats, props & materials provided',
  'Welcome kit with herbal tea & journal',
  'Certificate of participation',
  'Post-retreat wellness plan'
],
'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
'[
  {"time":"6:00 - 7:00 AM","icon":"🌅","title":"Sunrise Meditation & Pranayama","description":"Welcome the day in stillness. Guided breathwork and meditation to center your mind and set intention for the day ahead."},
  {"time":"7:00 - 9:00 AM","icon":"🧘","title":"Morning Hatha Yoga Flow","description":"Complete asana practice flowing from gentle warm-up through dynamic sequences. Focus on alignment, breath coordination, and mindful movement."},
  {"time":"9:00 - 10:00 AM","icon":"🍵","title":"Sattvic Breakfast","description":"Nourishing vegetarian meal eaten mindfully. Fresh fruits, whole grains, herbal teas. An opportunity to practice conscious eating."},
  {"time":"10:30 AM - 12:30 PM","icon":"📖","title":"Wellness Workshop","description":"Interactive session on yogic lifestyle, naturopathic principles, stress management, or seasonal wellness practices. Includes Q&A with Dr. Fareen."},
  {"time":"12:30 - 2:00 PM","icon":"🌻","title":"Mindful Lunch & Rest","description":"Wholesome vegetarian thali served with awareness. Followed by free time for journaling, rest, or quiet reflection in the garden."},
  {"time":"2:00 - 3:30 PM","icon":"🤸","title":"Restorative Yoga & Yin Practice","description":"Gentle, supported poses held for longer duration. Deep stretching that releases fascia and calms nervous system. Props-assisted comfort."},
  {"time":"3:30 - 5:00 PM","icon":"💤","title":"Yoga Nidra (Yogic Sleep)","description":"Guided systematic relaxation leading to a state between waking and sleeping. Profoundly restful - equivalent to 3 hours of sleep."},
  {"time":"5:00 - 5:45 PM","icon":"🌄","title":"Closing Circle & Integration","description":"Share reflections, set intentions, and receive your personalized wellness plan. Gentle chanting and gratitude practice."},
  {"time":"All Day","icon":"💚","title":"Community & Connection","description":"Connect with like-minded individuals. Build lasting friendships and a supportive wellness community that extends beyond the retreat."}
]'::jsonb,
true),
('Weekend Yoga Immersion', '2026-09-12', '2026-09-13', 'Nature Resort, 45km from Jaipur', 8500, 16,
'Two-day residential retreat in nature. Deepen your practice through extended sessions, nature walks, silent meals, and evening satsang. Includes accommodation and all meals.',
ARRAY[
  'Two full days of guided practice',
  'Accommodation in peaceful setting',
  'All meals (6 sattvic meals included)',
  'Morning & evening meditation',
  'Nature walk & outdoor yoga',
  'Bonfire & evening satsang',
  'Digital detox environment',
  'Take-home practice guide'
],
'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200',
'[
  {"time":"Saturday 6:00 AM","icon":"🌄","title":"Morning Meditation","description":"Silent meditation watching sunrise. Connect with nature and inner stillness."},
  {"time":"7:00 - 9:00 AM","icon":"🧘","title":"Morning Yoga Practice","description":"2-hour intensive asana session outdoors (weather permitting)."},
  {"time":"9:30 AM","icon":"🥗","title":"Breakfast","description":"Farm-fresh vegetarian breakfast"},
  {"time":"11:00 AM - 1:00 PM","icon":"🌳","title":"Nature Walk & Mindfulness","description":"Guided walk focusing on present-moment awareness"},
  {"time":"2:00 - 4:00 PM","icon":"📚","title":"Philosophy & Practice","description":"Yoga philosophy discussion and practical application"},
  {"time":"4:30 - 6:00 PM","icon":"🌬️","title":"Pranayama Deep Dive","description":"Advanced breathing techniques with detailed instruction"},
  {"time":"7:30 PM","icon":"🔥","title":"Bonfire Satsang","description":"Evening gathering with chanting, sharing, and community"},
  {"time":"Sunday Morning","icon":"🌅","title":"Sunrise Practice","description":"Gentle wake-up flow and meditation"},
  {"time":"Final Session","icon":"💫","title":"Integration & Closing","description":"Personal practice planning and closing ceremony"}
]'::jsonb,
true);


INSERT INTO gallery (url, caption, category, alt, sort_order, visible) VALUES
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Morning Hatha Yoga Session', 'classes', 'Group yoga class in sunlit studio', 1, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Meditation Circle at Prana House', 'classes', 'Students in seated meditation pose', 2, true),
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Evening Restorative Practice', 'classes', 'Gentle yoga with props and support', 3, true),
('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800', 'Pranayama Breathing Session', 'classes', 'Close-up of meditation and breathwork', 4, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Silent Meditation Practice', 'meditation', 'Peaceful meditation in natural setting', 5, true),
('https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?w=800', 'Mindfulness in Nature', 'meditation', 'Outdoor meditation by the water', 6, true),
('https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800', 'Group Meditation Circle', 'meditation', 'Community meditation gathering', 7, true),
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Yoga Philosophy Workshop', 'workshop', 'Interactive learning session with Dr. Fareen', 8, true),
('https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7?w=800', 'Ayurveda & Wellness Workshop', 'workshop', 'Practical naturopathy demonstrations', 9, true),
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Pranayama Deep Dive Workshop', 'workshop', 'Advanced breathing techniques training', 10, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Full Day Yoga Retreat - Morning Session', 'retreat', 'Sunrise yoga during retreat', 11, true),
('https://images.unsplash.com/photo-1545389336-cf090694435e?w=800', 'Retreat Wellness Workshop', 'retreat', 'Interactive wellness session at retreat', 12, true),
('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800', 'Sattvic Retreat Meal', 'retreat', 'Healthy vegetarian retreat meal presentation', 13, true),
('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'Yoga Nidra Relaxation', 'retreat', 'Deep relaxation practice during retreat', 14, true),
('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', 'Retreat Community Circle', 'retreat', 'Participants sharing and connecting', 15, true);
