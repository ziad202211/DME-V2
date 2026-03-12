import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service, Project } from '@/types/supabase';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchService();
      fetchRelatedProjects();
    }
  }, [slug]);

  const fetchService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProjects = async () => {
    try {
      // Get projects that might be related to this service
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedProjects(data || []);
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link to="/services">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/services" className="text-white hover:text-blue-200 flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Services
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              {service.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Featured Service
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Service Image */}
              {service.image_url && (
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-96 object-cover"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Service Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {service.content ? (
                      <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    ) : (
                      <p className="text-gray-600">
                        {service.description || 'No detailed description available.'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Service Features */}
              {service.icon && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          {service.icon}
                        </div>
                        <span className="font-medium">Professional Service</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Quality Assured</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Timely Delivery</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Expert Team</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Request Quote
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Button>
              </CardContent>
            </Card>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Projects</CardTitle>
                  <CardDescription>
                    Featured projects showcasing our expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors truncate">
                            {project.title}
                          </h4>
                          {project.location && (
                            <p className="text-xs text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {project.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2">
                    <Link to="/projects">
                      <Button variant="outline" size="sm" className="w-full">
                        View All Projects
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
