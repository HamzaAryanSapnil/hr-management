import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('attendance').del();
  
  const employees = await knex('employees').select('id');
  
  const attendanceRecords: Array<{
    employee_id: number;
    date: string;
    check_in_time: string;
    created_at: Date;
    updated_at: Date;
  }> = [];
  
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    employees.forEach((employee) => {
      if (Math.random() > 0.1) {
        const hour = Math.random() > 0.2 ? 9 : 10;
        const minute = Math.floor(Math.random() * 60);
        const checkInTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
        
        attendanceRecords.push({
          employee_id: employee.id,
          date: date.toISOString().split('T')[0],
          check_in_time: checkInTime,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    });
  }
  
  if (attendanceRecords.length > 0) {
    await knex('attendance').insert(attendanceRecords);
  }
}