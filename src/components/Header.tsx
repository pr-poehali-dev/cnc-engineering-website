import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/30 transition-all">
              <Icon name="Cog" size={32} className="text-white animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">CNC-Engineer.Ru</h1>
              <p className="text-sm text-white/80">Инжиниринговые услуги ЧПУ</p>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="hover:text-white/80 transition-colors font-medium">Главная</a>
            <a href="/services" className="hover:text-white/80 transition-colors font-medium">Услуги</a>
            <a href="/about" className="hover:text-white/80 transition-colors font-medium">О нас</a>
            <a href="/contacts" className="hover:text-white/80 transition-colors font-medium">Контакты</a>
            
            <div className="ml-4 pl-4 border-l border-white/30">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar || ''} />
                        <AvatarFallback className="bg-white text-purple-600 font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                      <Icon name="ChevronDown" size={16} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                      <Icon name="User" size={16} className="mr-2" />
                      Личный кабинет
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem onClick={() => window.location.href = '/admin'}>
                        <Icon name="Shield" size={16} className="mr-2" />
                        Админ панель
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white hover:text-purple-600 transition-all"
                    onClick={() => window.location.href = '/login'}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-white text-purple-600 hover:bg-white/90 transition-all"
                    onClick={() => window.location.href = '/register'}
                  >
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Регистрация
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;