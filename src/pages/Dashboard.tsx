import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    // Проверяем авторизацию
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);
    
    // Загружаем проекты пользователя
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const userProjects = allProjects.filter((p: any) => p.userId === userData.id);
    setProjects(userProjects);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    const project = {
      id: Date.now().toString(),
      userId: user.id,
      name: newProject.name,
      description: newProject.description,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    allProjects.push(project);
    localStorage.setItem('projects', JSON.stringify(allProjects));
    
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
  };

  const handleDeleteProject = (projectId: string) => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const filtered = allProjects.filter((p: any) => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(filtered));
    
    setProjects(projects.filter(p => p.id !== projectId));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3">
                <Icon name="Cog" size={32} className="text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">CNC-Engineer.Ru</h1>
                  <p className="text-sm text-slate-600">Личный кабинет</p>
                </div>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-600">
                Здравствуйте, <span className="font-medium">{user.name}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="projects">Проекты</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о профиле</CardTitle>
                  <CardDescription>Ваши личные данные</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                  <CardDescription>Ваша активность на платформе</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
                      <p className="text-sm text-gray-600">Проектов</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {projects.filter(p => p.status === 'active').length}
                      </p>
                      <p className="text-sm text-gray-600">Активных</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Создать новый проект</CardTitle>
                <CardDescription>Добавьте описание вашего проекта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Название проекта"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                  <textarea
                    placeholder="Описание проекта"
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                  <Button onClick={handleCreateProject} className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать проект
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Мои проекты</h3>
              {projects.length === 0 ? (
                <Alert>
                  <Icon name="Info" size={16} />
                  <AlertDescription>
                    У вас пока нет проектов. Создайте первый проект выше.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {project.description || 'Без описания'}
                            </CardDescription>
                          </div>
                          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                            {project.status === 'active' ? 'Активный' : 'Завершен'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>Управление вашими настройками</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Безопасность</h4>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Key" size={16} className="mr-2" />
                    Изменить пароль
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Уведомления</h4>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-notifications" className="rounded" />
                    <label htmlFor="email-notifications" className="text-sm">
                      Получать уведомления по email
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Удаление аккаунта</h4>
                  <Button variant="destructive" className="w-full justify-start">
                    <Icon name="AlertTriangle" size={16} className="mr-2" />
                    Удалить аккаунт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;