import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('employees').del();
  
  // Inserts seed entries
  await knex('employees').insert([
    {
      name: 'John Doe',
      age: 28,
      designation: 'Software Developer',
      hiring_date: '2023-01-15',
      date_of_birth: '1995-05-20',
      salary: 75000.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Jane Smith',
      age: 32,
      designation: 'Marketing Manager',
      hiring_date: '2023-02-20',
      date_of_birth: '1991-08-15',
      salary: 65000.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Mike Johnson',
      age: 35,
      designation: 'Senior Developer',
      hiring_date: '2022-11-10',
      date_of_birth: '1988-12-03',
      salary: 85000.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}