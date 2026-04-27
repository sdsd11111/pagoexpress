'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, LogOut, CheckCircle, XCircle, QrCode, PowerOff } from 'lucide-react';

interface BotStatus {
    connected: boolean;
    state: string;
    instance: string;
}

export default function AdminDashboard() {
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [loadingQr, setLoadingQr] = useState(false);
    const [error, setError] = useState('');
    
    const isViewingQR = useRef(false);
    const router = useRouter();

    // 1. Polling de Estado (Se ejecuta cada 5 segundos)
    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/admin/status');
            if (res.status === 401) {
                router.push('/admin/login');
                return;
            }
            const data = await res.json();
            setStatus(data);
            
            // Si se conectó, ocultamos el QR y apagamos la vista de QR
            if (data.connected) {
                setQrCode(null);
                isViewingQR.current = false;
            }
        } catch (err) {
            setError('Error al obtener el estado');
        } finally {
            setLoadingStatus(false);
        }
    };

    // 2. Obtener QR (Solo a petición del usuario o auto-refresh)
    const fetchQR = async () => {
        setLoadingQr(true);
        try {
            const res = await fetch('/api/admin/whatsapp/instance');
            if (res.ok) {
                const data = await res.json();
                if (data.qr) {
                    setQrCode(data.qr);
                    isViewingQR.current = true; // El usuario ya está viendo el QR
                }
            }
        } catch (error) {
            console.error('Error al generar QR:', error);
        } finally {
            setLoadingQr(false);
        }
    };

    // 3. Desconectar WhatsApp
    const handleDisconnectWhatsApp = async () => {
        if (!confirm('¿Estás seguro de que quieres desconectar el WhatsApp actual?')) return;
        
        try {
            await fetch('/api/admin/whatsapp/instance', { method: 'DELETE' });
            setStatus(prev => prev ? { ...prev, connected: false, state: 'close' } : null);
            setQrCode(null);
            isViewingQR.current = false;
        } catch (error) {
            console.error('Error al desconectar:', error);
        }
    };

    // Cerrar Sesión del CRM
    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    // ==========================================
    // Efectos de Ciclo de Vida y Auto-Recarga
    // ==========================================

    // Efecto 1: Polling de Estado Rápido (cada 5s)
    useEffect(() => {
        fetchStatus();
        const statusInterval = setInterval(fetchStatus, 5000);
        return () => clearInterval(statusInterval);
    }, []);

    // Efecto 2: Auto-refresco de QR (cada 30s) solo si es visible
    useEffect(() => {
        const qrInterval = setInterval(() => {
            // Solo pide otro QR si no estamos conectados, estamos en la vista de QR, y la pestaña está activa
            if (status && !status.connected && isViewingQR.current && document.visibilityState === 'visible') {
                console.log('Auto-refrescando QR por seguridad...');
                fetchQR();
            }
        }, 30000);

        return () => clearInterval(qrInterval);
    }, [status]);

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
                        className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm h-fit"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-semibold">Estado de Conexión</h2>
                            <button 
                                onClick={fetchStatus}
                                className={`p-2 rounded-lg bg-white/5 border border-white/10 transition-all ${loadingStatus ? 'animate-spin' : ''}`}
                            >
                                <RefreshCcw size={18} />
                            </button>
                        </div>

                        {loadingStatus && !status ? (
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
                                
                                {status.connected && (
                                    <button 
                                        onClick={handleDisconnectWhatsApp}
                                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 p-3 rounded-xl transition-colors border border-red-500/20"
                                    >
                                        <PowerOff size={18} />
                                        Desconectar Dispositivo
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-red-400">{error}</div>
                        )}
                    </motion.div>

                    {/* Acciones / QR Card */}
                    <AnimatePresence mode="wait">
                        {status && !status.connected ? (
                            <motion.div 
                                key="disconnected"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden h-fit"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <QrCode size={20} className="text-white/20" />
                                </div>
                                
                                <h2 className="text-xl font-semibold mb-6">Vincular Dispositivo</h2>
                                
                                {!qrCode ? (
                                    <button 
                                        onClick={fetchQR}
                                        disabled={loadingQr}
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loadingQr ? (
                                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generando...</>
                                        ) : (
                                            <><QrCode size={18} /> Generar Código QR</>
                                        )}
                                    </button>
                                ) : (
                                    <>
                                        <div className="bg-white p-4 rounded-2xl shadow-2xl relative">
                                            {loadingQr && (
                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                                                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                                </div>
                                            )}
                                            {qrCode.startsWith('data:image') ? (
                                                <img src={qrCode} alt="QR WhatsApp" className="w-64 h-64" />
                                            ) : (
                                                <div className="w-64 h-64 flex items-center justify-center text-black text-center text-sm p-4 font-mono break-all bg-gray-100 rounded-xl">
                                                    {qrCode}
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-6 text-sm text-white/40 text-center max-w-[250px]">
                                            Abre WhatsApp {'>'} Dispositivos vinculados {'>'} Vincular un nuevo dispositivo.
                                        </p>
                                    </>
                                )}
                            </motion.div>
                        ) : status?.connected ? (
                            <motion.div 
                                key="connected"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center h-full min-h-[300px]"
                            >
                                <CheckCircle size={64} className="text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
                                <h3 className="text-2xl font-bold mb-2 text-green-400">¡Conectado y Listo!</h3>
                                <p className="text-white/60">El asistente virtual está respondiendo a los clientes.</p>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
