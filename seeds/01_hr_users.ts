import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('hr_users').del();
  
  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  // Inserts seed entries
  await knex('hr_users').insert([
    {
      email: 'admin@hr.com',
      password_hash: hashedPassword,
      name: 'HR Administrator',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}