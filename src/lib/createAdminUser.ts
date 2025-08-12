export const createAdminUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Проверяем, есть ли уже админ
  const adminExists = users.find((u: any) => u.role === 'admin');
  
  if (!adminExists) {
    const adminUser = {
      id: 'admin-001',
      name: 'Администратор',
      email: 'admin@cnc-engineer.ru',
      phone: '8 (902) 867-25-37',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('Создан администратор по умолчанию:');
    console.log('Email: admin@cnc-engineer.ru');
    console.log('Пароль: admin123');
  }
};