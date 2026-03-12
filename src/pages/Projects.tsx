import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Filter
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/supabase';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, statusFilter]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'ongoing': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="relative w-full h-screen">
  <img 
    src="/jakub-dziubak-c-WkYXU8quc-unsplash.jpg" 
    alt="Projects Background" 
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50 "></div>
  <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-left">
    <h1 className="text-4xl font-bold text-[#190ab0] mb-4">Projects</h1>
    <h2 className="text-3xl text-white max-w-3xl mb-4">
      Shaping the Future with Every Project We Deliver
    </h2>
    <p className="text-gray-200 max-w-3xl ">
      Explore our extensive portfolio of public and private projects at DM Enterprise. With our vast experience in engineering consulting services, civil engineering solutions, and construction management expertise, we ensure each project meets the highest standards of quality and efficiency. Our projects reflect our commitment to excellence and innovation.
    </p>
  </div>
</div>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#190ab0] mb-14 mt-8 text-center">
        Our Gallery
      </h1>
        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm || statusFilter !== 'all' 
                ? 'No projects found matching your criteria.' 
                : 'No projects available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {project.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-1">
                        {/* <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge> */}
                        {project.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.client && (
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 mr-2 text-secondary" />
                        <span>Client: {project.client}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 mr-2 text-secondary" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.start_date && (
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 mr-2 text-secondary" />
                        <span>
                          {project.end_date 
                            ? `${formatDate(project.start_date)} - ${formatDate(project.end_date)}`
                            : `Started ${formatDate(project.start_date)}`
                          }
                        </span>
                      </div>
                    )}
                    <div className="pt-4 ">
                      <Link to={`/projects/${project.slug}`}>
                        <Button className="w-full bg-[#190ab0] hover:bg-[#190ab0]/70 text-white">
                          View Project Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
