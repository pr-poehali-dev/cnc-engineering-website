import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const services = [
    {
      title: "Написание программ УП",
      description: "Разработка управляющих программ для станков с ЧПУ различных типов",
      icon: "Code"
    },
    {
      title: "Оптимизация программ",
      description: "Улучшение действующих программ для повышения эффективности обработки",
      icon: "Zap"
    },
    {
      title: "Токарная группа",
      description: "Специализированные услуги для токарных станков с ЧПУ",
      icon: "RotateCw"
    },
    {
      title: "Фрезерная группа", 
      description: "Профессиональное программирование фрезерных станков",
      icon: "Cog"
    },
    {
      title: "Подбор инструментов",
      description: "Консультации по выбору режущего инструмента и оснастки",
      icon: "Wrench"
    },
    {
      title: "Мерительный инструмент",
      description: "Помощь в подборе измерительного оборудования",
      icon: "Ruler"
    },
    {
      title: "Разработка чертежей",
      description: "Создание и доработка технической документации",
      icon: "FileText"
    },
    {
      title: "3D моделирование",
      description: "Создание трёхмерных моделей деталей и изделий",
      icon: "Box"
    }
  ];

  const testimonials = [
    {
      name: "Алексей Петров",
      company: "ООО \"Металл-Сервис\"",
      text: "Отличная работа по оптимизации наших программ. Время обработки сократилось на 30%!",
      rating: 5
    },
    {
      name: "Марина Васильева",
      company: "Завод \"Точность\"",
      text: "Профессиональный подход к разработке УП. Рекомендую всем коллегам по отрасли.",
      rating: 5
    },
    {
      name: "Дмитрий Кузнецов",
      company: "ИП Кузнецов",
      text: "Помогли с подбором инструмента для сложной детали. Результат превзошёл ожидания.",
      rating: 5
    }
  ];

  const news = [
    {
      date: "15 июля 2024",
      title: "Новые возможности в области 5-осевой обработки",
      preview: "Расширяем спектр услуг - теперь программируем 5-координатные станки"
    },
    {
      date: "3 июля 2024", 
      title: "Успешное внедрение на предприятии в Златоусте",
      preview: "Завершили проект по оптимизации производства металлических изделий"
    },
    {
      date: "20 июня 2024",
      title: "Обновление программного обеспечения",
      preview: "Переход на новую версию CAM-системы для повышения точности программ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Cog" size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">CNC-Engineer.Ru</h1>
                <p className="text-sm text-slate-600">Инжиниринговые услуги ЧПУ</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6 items-center">
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Услуги</a>
              <a href="#news" className="text-slate-600 hover:text-blue-600 transition-colors">Новости</a>
              <a href="#reviews" className="text-slate-600 hover:text-blue-600 transition-colors">Отзывы</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">О нас</a>
              <a href="#contacts" className="text-slate-600 hover:text-blue-600 transition-colors">Контакты</a>
              <div className="ml-4 pl-4 border-l">
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/login'}>
                  <Icon name="User" size={16} className="mr-2" />
                  Войти
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit">
              Профессиональные услуги ЧПУ
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Инженерные решения для станков с ЧПУ
            </h2>
            <p className="text-lg text-slate-600">
              Написание управляющих программ, оптимизация обработки, подбор инструментов и разработка чертежей. 
              Профессиональные услуги в Челябинской области.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
              <Button variant="outline" size="lg">
                Наши услуги
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="img/296e1ecf-a181-43f1-be6b-15b91d2a4201.jpg" 
              alt="CNC Engineering Workspace" 
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Наши услуги</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Полный комплекс услуг по программированию и настройке станков с ЧПУ
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={service.icon} size={24} className="text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Новости</h3>
            <p className="text-slate-600">Последние обновления и достижения</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{item.date}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.preview}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Отзывы клиентов</h3>
            <p className="text-slate-600">Что говорят о нашей работе</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">О компании</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  CNC-Engineer.Ru — это команда профессиональных инженеров, специализирующихся на 
                  программировании станков с ЧПУ. Мы работаем в Челябинской области и предоставляем 
                  полный спектр услуг от написания управляющих программ до подбора инструментов.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Наш опыт позволяет решать задачи любой сложности в области токарной и фрезерной 
                  обработки, а также создавать техническую документацию и 3D модели.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">5+</div>
                  <div className="text-slate-600">лет опыта</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-slate-600">проектов</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-slate-600">клиентов</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-slate-600">поддержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Контакты</h3>
            <p className="text-slate-600">Свяжитесь с нами для консультации</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Phone" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:89028672537" className="text-lg font-semibold text-blue-600 hover:underline">
                  8 (902) 867-25-37
                </a>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="MapPin" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Местоположение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Челябинская область<br />
                  г. Миасс
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Globe" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Сайт</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-slate-800">
                  CNC-Engineer.Ru
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Icon name="Cog" size={24} className="text-blue-400" />
              <span className="text-lg font-semibold">CNC-Engineer.Ru</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 CNC-Engineer.Ru. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;