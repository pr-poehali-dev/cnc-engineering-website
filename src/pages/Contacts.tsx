import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем сообщение в localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      ...formData,
      date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '8 (902) 867-25-37',
      link: 'tel:89028672537',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@cnc-engineer.ru',
      link: 'mailto:info@cnc-engineer.ru',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'Челябинская область, г. Миасс',
      link: null,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      value: 'Пн-Пт: 9:00-18:00',
      link: null,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const socialLinks = [
    { icon: 'MessageCircle', name: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600' },
    { icon: 'Send', name: 'Telegram', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: 'AtSign', name: 'Email', color: 'bg-red-500 hover:bg-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-gray-700">
              Мы всегда готовы ответить на ваши вопросы и помочь с реализацией проектов любой сложности
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={info.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-blue-600 hover:underline">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Отправить сообщение</CardTitle>
                <CardDescription>
                  Заполните форму и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {success && (
                    <Alert className="bg-green-50 border-green-200">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <AlertDescription className="text-green-800">
                        Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+7 (900) 000-00-00"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Опишите ваш проект или задайте вопрос..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Местоположение</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="MapPin" size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">Челябинская область</p>
                      <p className="text-2xl font-bold text-gray-800">г. Миасс</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Социальные сети</CardTitle>
                  <CardDescription>Следите за нашими новостями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        size="icon"
                        className={`${social.color} text-white`}
                      >
                        <Icon name={social.icon} size={20} />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl bg-gradient-to-br from-purple-100 to-pink-100">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={24} className="text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Быстрая консультация</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Нужен быстрый ответ? Позвоните нам прямо сейчас и получите бесплатную консультацию по вашему проекту.
                      </p>
                      <Button size="sm" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Позвонить сейчас
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;