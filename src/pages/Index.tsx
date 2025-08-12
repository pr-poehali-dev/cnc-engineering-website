import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [services, setServices] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'CNC-Engineer.Ru',
    siteDescription: 'Инжиниринговые услуги ЧПУ',
    phone: '8 (902) 867-25-37',
    email: 'info@cnc-engineer.ru',
    address: 'Челябинская область, г. Миасс'
  });

  useEffect(() => {
    // Загружаем услуги
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setServices(JSON.parse(savedServices).slice(0, 8)); // Показываем первые 8
    }
    
    // Загружаем настройки сайта
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                Профессиональные услуги ЧПУ
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Инженерные решения
                </span>
                <br />
                для станков с ЧПУ
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Написание управляющих программ, оптимизация обработки, подбор инструментов и разработка чертежей. 
                Профессиональные услуги в {siteSettings.address}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                  onClick={() => window.location.href = '/contacts'}
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться с нами
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 hover:bg-purple-50"
                  onClick={() => window.location.href = '/services'}
                >
                  Наши услуги
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={24} className="text-green-500" />
                  <span className="text-gray-700">5+ лет опыта</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={24} className="text-blue-500" />
                  <span className="text-gray-700">100+ клиентов</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30"></div>
              <img 
                src="img/296e1ecf-a181-43f1-be6b-15b91d2a4201.jpg" 
                alt="CNC Engineering Workspace" 
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Полный комплекс услуг по программированию и настройке станков с ЧПУ
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <Card key={service.id} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                  <div className={`h-1 ${service.color || 'bg-gradient-to-r from-purple-500 to-pink-500'}`}></div>
                  <CardHeader>
                    <div className={`w-14 h-14 ${service.color || 'bg-gradient-to-br from-purple-500 to-pink-500'} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon name={service.icon} size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Услуги загружаются...</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/services'}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Все услуги
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Icon name="Award" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Опыт и профессионализм</h3>
                <p className="text-gray-600">
                  Более 5 лет работы с различными системами ЧПУ и типами оборудования
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Icon name="Zap" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Быстрое выполнение</h3>
                <p className="text-gray-600">
                  Соблюдаем сроки и гарантируем оперативную работу над вашими проектами
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Icon name="HeartHandshake" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Индивидуальный подход</h3>
                <p className="text-gray-600">
                  Каждый проект уникален, и мы находим оптимальное решение для ваших задач
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Готовы оптимизировать ваше производство?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня и получите бесплатную консультацию по вашему проекту
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="font-semibold"
              onClick={() => window.location.href = '/contacts'}
            >
              <Icon name="Phone" size={20} className="mr-2" />
              {siteSettings.phone}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600"
              onClick={() => window.location.href = '/services'}
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Посмотреть услуги
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Cog" size={32} className="text-purple-400" />
                <h3 className="text-xl font-bold">{siteSettings.siteName}</h3>
              </div>
              <p className="text-gray-400">{siteSettings.siteDescription}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Главная</a></li>
                <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Услуги</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">О нас</a></li>
                <li><a href="/contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>{siteSettings.phone}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>{siteSettings.email}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>{siteSettings.address}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-gray-400">Пн-Пт: 9:00-18:00</p>
              <p className="text-gray-400">Сб-Вс: по договоренности</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 {siteSettings.siteName}. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;