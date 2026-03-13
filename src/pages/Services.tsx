import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  ArrowRight,
  Star,
  Settings,
  Wrench,
  Cpu,
  Map,
  Zap
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/supabase';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('featured', { ascending: false })
        .order('order_index', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const getServiceIcon = (iconName?: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'settings': <Settings className="h-8 w-8" />,
      'wrench': <Wrench className="h-8 w-8" />,
      'cpu': <Cpu className="h-8 w-8" />,
      'map': <Map className="h-8 w-8" />,
      'zap': <Zap className="h-8 w-8" />,
    };
    
    return iconName ? iconMap[iconName] || <Settings className="h-8 w-8" /> : <Settings className="h-8 w-8" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }
// We offer comprehensive engineering and project management solutions tailored to meet the unique needs of each client and project.
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
       <div className="relative w-full h-screen">
  <img 
    src="/maranda-vandergriff-7aakZdIl4vg-unsplash.jpg" 
    alt="Projects Background" 
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/70 "></div>
  <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-left">
    <h1 className="text-4xl font-bold text-[#190ab0] mb-4">Services</h1>
    
    <p className="text-gray-200 max-w-xl ">
We offer comprehensive engineering and project management solutions tailored to meet the unique needs of each client and project.
    </p>
  </div>
</div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Featured Services */}
        {filteredServices.filter(service => service.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices
                .filter(service => service.featured)
                .map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full text-blue-600">
                        {getServiceIcon(service.icon)}
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <div className="flex justify-center mb-2">
                        <Badge variant="default">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/services/${service.slug}`}>
                        <Button className="w-full">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Services */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
  {filteredServices.map((service, index) => (
    <div
      key={service.id}
      className={`grid lg:grid-cols-2 gap-16 items-center ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      
      {/* Image */}
      <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={service.image_url || "/placeholder.jpg"}
            alt={service.title}
            className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          

          {service.featured && (
            <Badge className="bg-blue-600">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <h2 className="text-3xl font-semibold text-gray-900">
          {service.title}
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-xl">
          {service.description}
        </p>

        <Link to={`/services/${service.slug}`}>
          <Button className="mt-3 bg-[#190ab0] hover:bg-[#190ab0]/90 text-white">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

    </div>
  ))}
</div>

        {/* No Services Found */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? 'No services found matching your search.' 
                : 'No services available at the moment.'}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
