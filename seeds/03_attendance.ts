import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('attendance').del();
  
  // Get employee IDs
  const employees = await knex('employees').select('id');
  
  const attendanceRecords = [];
  const today = new Date();
  
  // Generate attendance records for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    employees.forEach((employee, index) => {
      // Skip some days randomly to simulate real attendance
      if (Math.random() > 0.1) { // 90% attendance rate
        const hour = Math.random() > 0.2 ? 9 : 10; // 80% on time, 20% late
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
  
  // Inserts seed entries
  await knex('attendance').insert(attendanceRecords);
}