import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'CNC-Engineer.Ru',
    siteDescription: 'Инжиниринговые услуги ЧПУ',
    phone: '8 (902) 867-25-37',
    email: 'info@cnc-engineer.ru',
    address: 'Челябинская область, г. Миасс'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Формы для создания
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  });
  
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    features: '',
    icon: 'Star',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    
    const userData = JSON.parse(currentUser);
    if (userData.role !== 'admin') {
      window.location.href = '/dashboard';
      return;
    }
    
    setUser(userData);
    loadUsers();
    loadServices();
    loadSettings();
  }, []);

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  };

  const loadServices = () => {
    const allServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(allServices);
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setMessage({ type: 'error', text: 'Заполните все обязательные поля!' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === newUser.email)) {
      setMessage({ type: 'error', text: 'Пользователь с таким email уже существует!' });
      return;
    }

    const user = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
    
    setNewUser({ name: '', email: '', phone: '', password: '', role: 'user' });
    setMessage({ type: 'success', text: 'Пользователь успешно создан!' });
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === user.id) {
      setMessage({ type: 'error', text: 'Вы не можете удалить свой аккаунт!' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filtered = users.filter((u: any) => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(filtered));
    loadUsers();
    
    setMessage({ type: 'success', text: 'Пользователь удален!' });
  };

  const handleResetPassword = (userId: string, newPassword: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      loadUsers();
      
      setMessage({ type: 'success', text: 'Пароль успешно изменен!' });
    }
  };

  const handleCreateService = () => {
    if (!newService.title || !newService.description || !newService.price) {
      setMessage({ type: 'error', text: 'Заполните все обязательные поля!' });
      return;
    }

    const service = {
      id: Date.now().toString(),
      ...newService,
      features: newService.features.split(',').map(f => f.trim()).filter(f => f)
    };

    const services = JSON.parse(localStorage.getItem('services') || '[]');
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    loadServices();
    
    setNewService({ title: '', description: '', price: '', features: '', icon: 'Star', color: 'bg-gradient-to-br from-blue-500 to-blue-600' });
    setMessage({ type: 'success', text: 'Услуга успешно добавлена!' });
  };

  const handleDeleteService = (serviceId: string) => {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const filtered = services.filter((s: any) => s.id !== serviceId);
    localStorage.setItem('services', JSON.stringify(filtered));
    loadServices();
    
    setMessage({ type: 'success', text: 'Услуга удалена!' });
  };

  const handleSaveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    setMessage({ type: 'success', text: 'Настройки сохранены!' });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Админ панель
          </h1>
          <p className="text-gray-600 mt-2">Управление сайтом и пользователями</p>
        </div>

        {message.text && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <Icon name={message.type === 'success' ? 'CheckCircle' : 'AlertCircle'} size={16} className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} />
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3 mb-8">
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Создать пользователя</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Имя *</Label>
                    <Input
                      id="userName"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email *</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="user@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPhone">Телефон</Label>
                    <Input
                      id="userPhone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Пароль *</Label>
                    <Input
                      id="userPassword"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Минимум 6 символов"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Роль</Label>
                    <select
                      id="userRole"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="user">Пользователь</option>
                      <option value="admin">Администратор</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleCreateUser} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Создать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список пользователей</CardTitle>
                <CardDescription>Всего пользователей: {users.length}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phone || '—'}</TableCell>
                        <TableCell>
                          <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                            {u.role === 'admin' ? 'Админ' : 'Пользователь'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Icon name="Key" size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Сменить пароль</DialogTitle>
                                  <DialogDescription>
                                    Введите новый пароль для {u.name}
                                  </DialogDescription>
                                </DialogHeader>
                                <Input
                                  id={`password-${u.id}`}
                                  type="password"
                                  placeholder="Новый пароль"
                                />
                                <DialogFooter>
                                  <Button
                                    onClick={() => {
                                      const input = document.getElementById(`password-${u.id}`) as HTMLInputElement;
                                      if (input?.value) {
                                        handleResetPassword(u.id, input.value);
                                      }
                                    }}
                                  >
                                    Сохранить
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-red-600 hover:text-red-700"
                              disabled={u.id === user.id}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Добавить услугу</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle">Название *</Label>
                    <Input
                      id="serviceTitle"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="Название услуги"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicePrice">Цена *</Label>
                    <Input
                      id="servicePrice"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      placeholder="от 5000 ₽"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="serviceDescription">Описание *</Label>
                    <Textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Описание услуги"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="serviceFeatures">Особенности (через запятую)</Label>
                    <Input
                      id="serviceFeatures"
                      value={newService.features}
                      onChange={(e) => setNewService({ ...newService, features: e.target.value })}
                      placeholder="Особенность 1, Особенность 2, Особенность 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceIcon">Иконка</Label>
                    <select
                      id="serviceIcon"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newService.icon}
                      onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    >
                      <option value="Star">Star</option>
                      <option value="Code">Code</option>
                      <option value="Zap">Zap</option>
                      <option value="Cog">Cog</option>
                      <option value="Box">Box</option>
                      <option value="Wrench">Wrench</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleCreateService} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить услугу
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список услуг</CardTitle>
                <CardDescription>Всего услуг: {services.length}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <Card key={service.id} className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Icon name={service.icon} size={24} />
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                        <Badge variant="secondary">{service.price}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        {service.features && service.features.length > 0 && (
                          <div className="text-xs text-gray-500">
                            {service.features.map((f: string, i: number) => (
                              <span key={i}>• {f} </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки сайта</CardTitle>
                <CardDescription>Основные параметры сайта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Название сайта</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sitePhone">Телефон</Label>
                    <Input
                      id="sitePhone"
                      value={siteSettings.phone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteEmail">Email</Label>
                    <Input
                      id="siteEmail"
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteAddress">Адрес</Label>
                    <Input
                      id="siteAddress"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="siteDescription">Описание сайта</Label>
                    <Textarea
                      id="siteDescription"
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;