import type { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
 
  await knex('hr_users').del();
  

  const hashedPassword = await bcrypt.hash('admin123', 12);
  
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