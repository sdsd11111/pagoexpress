
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, LogOut, CheckCircle, XCircle, QrCode } from 'lucide-react';

interface BotStatus {
    connected: boolean;
    state: string;
    qr: string | null;
    instance: string;
}

export default function AdminDashboard() {
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/status');
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            const data = await res.json();
            setStatus(data);
        } catch (err) {
            setError('Error al conectar con la API');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Auto-refresh 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-white/50 text-sm">Gestiona tu instancia de WhatsApp</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        title="Cerrar sesión"
                    >
                        <LogOut size={20} className="text-red-400" />
                    </button>
                </header>

                <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Status Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-semibold">Estado de Conexión</h2>
                            <button 
                                onClick={fetchStatus}
                                disabled={loading}
                                className={`p-2 rounded-lg bg-white/5 border border-white/10 transition-all ${loading ? 'animate-spin' : ''}`}
                            >
                                <RefreshCcw size={18} />
                            </button>
                        </div>

                        {loading && !status ? (
                            <div className="h-40 flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            </div>
                        ) : status ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    {status.connected ? (
                                        <div className="p-4 bg-green-500/10 rounded-2xl">
                                            <CheckCircle size={32} className="text-green-500" />
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-red-500/10 rounded-2xl">
                                            <XCircle size={32} className="text-red-500" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-2xl font-bold">{status.connected ? 'Conectado' : 'Desconectado'}</p>
                                        <p className="text-white/40 text-sm capitalize">Instancia: {status.instance}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-sm text-white/60 mb-1">Estado Técnico</p>
                                    <p className="font-mono text-blue-400">{status.state.toUpperCase()}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-400">{error}</div>
                        )}
                    </motion.div>

                    {/* QR Card */}
                    <AnimatePresence>
                        {status && !status.connected && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <QrCode size={20} className="text-white/20" />
                                </div>
                                
                                <h2 className="text-xl font-semibold mb-6">Escanea para Conectar</h2>
                                
                                <div className="bg-white p-4 rounded-2xl shadow-2xl">
                                    {status.qr ? (
                                        status.qr.startsWith('data:image') ? (
                                            <img src={status.qr} alt="QR WhatsApp" className="w-64 h-64" />
                                        ) : (
                                            <div className="w-64 h-64 flex items-center justify-center text-black text-center text-sm p-4 font-mono break-all bg-gray-100 rounded-xl">
                                                {status.qr}
                                            </div>
                                        )
                                    ) : (
                                        <div className="w-64 h-64 flex items-center justify-center text-gray-400 italic">
                                            Generando código...
                                        </div>
                                    )}
                                </div>
                                <p className="mt-6 text-sm text-white/40 text-center max-w-[250px]">
                                    Abre WhatsApp en tu teléfono {'>'} Dispositivos vinculados {'>'} Vincular un nuevo dispositivo.
                                </p>
                            </motion.div>
                        )}
                        
                        {status && status.connected && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center"
                            >
                                <CheckCircle size={48} className="text-green-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">¡Todo en orden!</h3>
                                <p className="text-white/60">El chatbot está operando normalmente en esta instancia.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
