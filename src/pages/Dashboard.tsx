import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);
    setProfileData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      company: userData.company || ''
    });
    setAvatarUrl(userData.avatar || '');
  }, []);

  const handleProfileUpdate = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...profileData };
      localStorage.setItem('users', JSON.stringify(users));
      
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setMessage({ type: 'success', text: 'Профиль успешно обновлен!' });
      setEditMode(false);
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Новые пароли не совпадают!' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 6 символов!' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id && u.password === passwordData.currentPassword);
    
    if (userIndex === -1) {
      setMessage({ type: 'error', text: 'Неверный текущий пароль!' });
      return;
    }

    users[userIndex].password = passwordData.newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    setMessage({ type: 'success', text: 'Пароль успешно изменен!' });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        
        // Сохраняем аватар
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        
        if (userIndex !== -1) {
          users[userIndex].avatar = base64String;
          localStorage.setItem('users', JSON.stringify(users));
          
          const updatedUser = { ...user, avatar: base64String };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          setUser(updatedUser);
          
          setMessage({ type: 'success', text: 'Аватар успешно обновлен!' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Личный кабинет
          </h1>
          <p className="text-gray-600 mt-2">Управляйте своим профилем и настройками</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          
          {message.text && (
            <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <Icon name={message.type === 'success' ? 'CheckCircle' : 'AlertCircle'} size={16} className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} />
              <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Фото профиля</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>
                          <Icon name="Upload" size={16} className="mr-2" />
                          Загрузить фото
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Информация профиля</CardTitle>
                      <CardDescription>Ваши личные данные</CardDescription>
                    </div>
                    {!editMode && (
                      <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        <Icon name="Pencil" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editMode ? (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Компания</Label>
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleProfileUpdate} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Отмена
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-500">Имя</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Телефон</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Компания</p>
                        <p className="font-medium">{user.company || '—'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Дата регистрации</p>
                        <p className="font-medium">
                          {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Изменить пароль</CardTitle>
                  <CardDescription>Обновите пароль вашего аккаунта</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Текущий пароль</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Новый пароль</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Icon name="Key" size={16} className="mr-2" />
                    Изменить пароль
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Настройки аккаунта</CardTitle>
                  <CardDescription>Дополнительные параметры</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Уведомления</h4>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notifications" className="rounded" defaultChecked />
                      <label htmlFor="email-notifications" className="text-sm">
                        Получать уведомления по email
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notifications" className="rounded" />
                      <label htmlFor="sms-notifications" className="text-sm">
                        SMS-уведомления о статусе заказов
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <h4 className="font-medium text-red-600">Опасная зона</h4>
                    <Button variant="destructive" className="w-full">
                      <Icon name="AlertTriangle" size={16} className="mr-2" />
                      Удалить аккаунт
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;