import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const About = () => {
  const stats = [
    { value: '5+', label: 'Лет опыта', icon: 'Calendar' },
    { value: '100+', label: 'Выполненных проектов', icon: 'Briefcase' },
    { value: '50+', label: 'Постоянных клиентов', icon: 'Users' },
    { value: '24/7', label: 'Техподдержка', icon: 'HeadphonesIcon' }
  ];

  const values = [
    {
      title: 'Профессионализм',
      description: 'Наши специалисты имеют многолетний опыт работы с различными системами ЧПУ',
      icon: 'Award',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Инновации',
      description: 'Используем современные технологии и методики для оптимизации производства',
      icon: 'Lightbulb',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Надёжность',
      description: 'Гарантируем качество выполненных работ и соблюдение сроков',
      icon: 'Shield',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Поддержка',
      description: 'Оказываем полное сопровождение проектов на всех этапах',
      icon: 'Heart',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const team = [
    {
      name: 'Александр Петров',
      position: 'Главный инженер',
      experience: '15 лет в ЧПУ',
      photo: null
    },
    {
      name: 'Михаил Соколов',
      position: 'Программист ЧПУ',
      experience: '10 лет опыта',
      photo: null
    },
    {
      name: 'Елена Васильева',
      position: '3D-моделирование',
      experience: '8 лет в CAD/CAM',
      photo: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              О компании CNC-Engineer.Ru
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Мы — команда профессионалов в области программирования станков с ЧПУ. 
              Наша миссия — сделать современные технологии обработки доступными для предприятий любого масштаба.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform">
                  <Icon name={stat.icon} size={32} className="text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  CNC-Engineer.Ru начала свою деятельность в 2019 году как небольшая команда энтузиастов, 
                  увлеченных современными технологиями металлообработки.
                </p>
                <p className="leading-relaxed">
                  За годы работы мы выросли в надежного партнера для десятков предприятий Челябинской области 
                  и других регионов России. Наш опыт позволяет решать задачи любой сложности — от простых 
                  токарных операций до сложнейшей 5-осевой обработки.
                </p>
                <p className="leading-relaxed">
                  Сегодня мы продолжаем развиваться, осваивая новые технологии и расширяя спектр услуг, 
                  чтобы предоставлять нашим клиентам самые современные решения в области ЧПУ-обработки.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30"></div>
              <Card className="relative overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Icon name="MapPin" size={24} className="mx-auto mb-2 text-purple-600" />
                      <p className="font-semibold">Челябинская область</p>
                      <p className="text-sm text-gray-600">г. Миасс</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Icon name="Clock" size={24} className="mx-auto mb-2 text-pink-600" />
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Icon name="Phone" size={24} className="mx-auto mb-2 text-blue-600" />
                      <p className="font-semibold">Телефон</p>
                      <p className="text-sm text-gray-600">8 (902) 867-25-37</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center">
                      <Icon name="Mail" size={24} className="mx-auto mb-2 text-green-600" />
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600">info@cnc-engineer.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Наши ценности
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={value.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Наша команда
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Icon name="User" size={48} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                  <Badge className="mx-auto block w-fit mb-2">{member.position}</Badge>
                  <p className="text-center text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать сотрудничество?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами сегодня и получите бесплатную консультацию
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="font-semibold"
            onClick={() => window.location.href = '/contacts'}
          >
            <Icon name="Phone" size={20} className="mr-2" />
            Связаться с нами
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;