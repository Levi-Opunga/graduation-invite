-- Insert a sample graduation event
INSERT INTO events (name, date, time, location, description, primary_color, secondary_color, logo_url)
VALUES (
  'Levi\'s Graduation',
  '2025-06-15',
  '10:00 AM',
  'Upepo Restaurant, Kwetu Nairobi, Curio Collection by Hilton',
  'I’m so excited to let you know that I’ll be graduating this year! 
It’s been a long journey, and I’d love to have you there to celebrate this special moment with me.',
  '#1a2f4a',
  '#22d3ee',
  '/uploads/squares.png'
) ON CONFLICT DO NOTHING;

-- Insert a sample admin (password: Pa$$w0rd! - hashed with bcrypt)
-- Note: In production, you should hash this properly
INSERT INTO admins (email, password_hash)
VALUES (
  'admin@graduation.com',
  '$2a$12$XADJ3iJDH6qyRC7sNgceBe6UxapLUxo45jbx7a9PXOr.DYovxKb66'
) ON CONFLICT (email) DO NOTHING;
