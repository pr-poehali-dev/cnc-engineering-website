import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Загружаем услуги из localStorage
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Если услуг нет, загружаем дефолтные
      const defaultServices = [
        {
          id: '1',
          title: 'Написание программ УП',
          description: 'Разработка управляющих программ для станков с ЧПУ различных типов. Работаем со всеми системами управления.',
          price: 'от 5000 ₽',
          features: ['Fanuc', 'Siemens', 'Heidenhain', 'Mazatrol'],
          icon: 'Code',
          color: 'bg-gradient-to-br from-blue-500 to-blue-600'
        },
        {
          id: '2',
          title: 'Оптимизация программ',
          description: 'Улучшение действующих программ для повышения эффективности обработки и сокращения времени цикла.',
          price: 'от 3000 ₽',
          features: ['Анализ траекторий', 'Оптимизация режимов', 'Сокращение времени'],
          icon: 'Zap',
          color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
        },
        {
          id: '3',
          title: 'Токарная группа',
          description: 'Специализированные услуги для токарных станков с ЧПУ. Программирование сложных деталей.',
          price: 'от 4000 ₽',
          features: ['2-осевая обработка', 'Многоинструментальная', 'С приводным инструментом'],
          icon: 'RotateCw',
          color: 'bg-gradient-to-br from-green-500 to-teal-500'
        },
        {
          id: '4',
          title: 'Фрезерная группа',
          description: 'Профессиональное программирование фрезерных станков. 3-х, 4-х и 5-осевая обработка.',
          price: 'от 6000 ₽',
          features: ['3-осевая', '4-осевая', '5-осевая', 'Высокоскоростная'],
          icon: 'Cog',
          color: 'bg-gradient-to-br from-purple-500 to-pink-500'
        },
        {
          id: '5',
          title: 'Подбор инструментов',
          description: 'Консультации по выбору режущего инструмента и оснастки для оптимальной обработки.',
          price: 'от 2000 ₽',
          features: ['Анализ материала', 'Расчет режимов', 'Подбор оснастки'],
          icon: 'Wrench',
          color: 'bg-gradient-to-br from-red-500 to-rose-500'
        },
        {
          id: '6',
          title: '3D моделирование',
          description: 'Создание трёхмерных моделей деталей и изделий. Реверс-инжиниринг.',
          price: 'от 3500 ₽',
          features: ['SolidWorks', 'Fusion 360', 'AutoCAD', 'Компас-3D'],
          icon: 'Box',
          color: 'bg-gradient-to-br from-indigo-500 to-purple-500'
        }
      ];
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Наши услуги
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Полный комплекс услуг по программированию и настройке станков с ЧПУ. 
              Работаем с любыми системами управления и типами оборудования.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                <Icon name="Award" size={16} className="mr-2" />
                5+ лет опыта
              </Badge>
              <Badge className="bg-gradient-to-r from-pink-600 to-orange-600 text-white px-4 py-2">
                <Icon name="Users" size={16} className="mr-2" />
                100+ клиентов
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2">
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Гарантия качества
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                <div className={`h-2 ${service.color}`}></div>
                <CardHeader>
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={service.icon} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-lg font-semibold">
                      {service.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Icon name="CheckCircle" size={16} className="mr-2 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full mt-6 ${service.color} text-white hover:opacity-90`}>
                    Заказать услугу
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Не нашли нужную услугу?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для индивидуальной консультации
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" onClick={() => window.location.href = '/contacts'}>
              <Icon name="Phone" size={20} className="mr-2" />
              Позвонить
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
              <Icon name="Mail" size={20} className="mr-2" />
              Написать
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;