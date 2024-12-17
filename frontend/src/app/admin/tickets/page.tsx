'use client';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Ticket } from '@/types/ticket';
import { useRouter } from 'next/navigation';
import AdminProtected from '@/components/AdminProtected';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import TicketCard from '@/components/admin/TicketCard'
import AdminPageHeader from '@/components/admin/AdminPageHeader'

export default function AdminTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/api/v1/tickets');
      setTickets(data);
    } catch (err) {
      setError(`Wystąpił błąd podczas pobierania karnetów  ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten karnet?')) return;

    try {
      await axios.delete(`/api/v1/tickets/${id}`);
      toast.success('Karnet został usunięty');
      await fetchTickets();
    } catch (err) {
      toast.error(`Nie udało się usunąć karnetu ${err}`);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <AdminPageHeader
            title="Panel Administratora - Karnety"
            description="Zarządzaj karnetami - dodawaj, edytuj i usuwaj dostępne opcje"
            buttonText="Dodaj nowy karnet"
            onButtonClick={() => router.push('/admin/tickets/add')}
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-lg text-gray-600">Ładowanie karnetów...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtected>
  );
} 