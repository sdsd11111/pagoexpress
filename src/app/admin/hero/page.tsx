'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Layout, Image as ImageIcon, Link as LinkIcon, ArrowLeft, Loader2, CheckCircle, Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Slide {
    id?: number;
    image_url: string;
    slug: string;
    isUploading?: boolean;
}

interface HeroConfig {
    h1: string;
    description: string;
}

export default function AdminHero() {
    const [config, setConfig] = useState<HeroConfig>({ h1: '', description: '' });
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const fetchData = async () => {
        try {
            // 1. Check auth first
            const authRes = await fetch('/api/admin/status');
            if (authRes.status === 401) {
                router.push('/admin/login');
                return;
            }

            // 2. Fetch Hero data
            const res = await fetch('/api/admin/hero');
            const data = await res.json();
            setConfig(data.config);
            setSlides(data.slides);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        setSuccess(false);

        try {
            const res = await fetch('/api/admin/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...config, slides }),
            });

            if (res.status === 401) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                router.push('/admin/login');
                return;
            }

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                await fetchData(); // Refresh to get new IDs
            } else {
                const data = await res.json();
                alert(`Error al guardar: ${data.error || 'Desconocido'}`);
            }
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error de conexión al guardar.');
        } finally {
            setSaving(false);
        }
    };

    const updateSlide = (index: number, field: keyof Slide, value: any) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setSlides(newSlides);
    };

    const addSlide = () => {
        setSlides([...slides, { image_url: '', slug: '' }]);
    };

    const removeSlide = (index: number) => {
        if (!confirm('¿Estás seguro de eliminar este slide?')) return;
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
    };

    const handleFileUpload = async (index: number, file: File) => {
        updateSlide(index, 'isUploading', true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.status === 401) {
                alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                router.push('/admin/login');
                return;
            }

            const data = await res.json();
            if (data.success) {
                updateSlide(index, 'image_url', data.url);
            } else {
                alert(data.error || 'Error al subir la imagen');
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Error crítico al subir');
        } finally {
            updateSlide(index, 'isUploading', false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-pe-yellow animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Editor de Hero
                            </h1>
                            <p className="text-white/50 text-sm">Gestiona imágenes, textos y enlaces de la portada</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button 
                            onClick={addSlide}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/10"
                        >
                            <Plus size={18} />
                            Añadir Imagen
                        </button>
                        <button 
                            onClick={() => handleSave()}
                            disabled={saving}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-pe-yellow text-pe-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {success ? '¡Guardado!' : 'Guardar Todo'}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Text Config */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm sticky top-10"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Layout className="text-pe-yellow" size={20} />
                                <h2 className="text-xl font-semibold">Textos Principales</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 font-medium">Título Principal (H1)</label>
                                    <input 
                                        type="text" 
                                        value={config.h1}
                                        onChange={(e) => setConfig({...config, h1: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-pe-yellow outline-none transition-colors text-sm"
                                        placeholder="Ej: Pagos y remesas..."
                                    />
                                    <p className="text-[10px] text-white/30 italic">* La palabra "Ecuador" se resaltará en amarillo automáticamente.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60 font-medium">Descripción Corta</label>
                                    <textarea 
                                        value={config.description}
                                        onChange={(e) => setConfig({...config, description: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-pe-yellow outline-none transition-colors h-32 resize-none text-sm"
                                        placeholder="Ej: Simplificamos tus trámites..."
                                    />
                                </div>

                                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex gap-3">
                                    <AlertCircle className="text-pe-yellow shrink-0" size={18} />
                                    <p className="text-[11px] text-pe-yellow/80 leading-relaxed">
                                        <strong>Tip:</strong> Sube imágenes en formato rectangular (16:7) para que se vean perfectas en computadoras y celulares.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content: Slides Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {slides.map((slide, index) => (
                                    <motion.div 
                                        key={slide.id || `new-${index}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="group bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm space-y-4 hover:border-white/20 transition-all relative"
                                    >
                                        <button 
                                            onClick={() => removeSlide(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10 shadow-lg"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                        <div className="space-y-4">
                                            {/* Preview & Upload */}
                                            <div className="relative aspect-[16/7] bg-black/50 rounded-xl border border-white/10 overflow-hidden group/img">
                                                {slide.image_url ? (
                                                    <img src={slide.image_url} alt="" className="w-full h-full object-cover transition-transform group-hover/img:scale-105" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                                                        <ImageIcon size={32} />
                                                        <span className="text-[10px] uppercase font-bold mt-2 tracking-widest">Haz clic para subir imagen</span>
                                                    </div>
                                                )}
                                                
                                                {slide.isUploading && (
                                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                                        <Loader2 className="text-pe-yellow animate-spin" />
                                                    </div>
                                                )}

                                                <button 
                                                    onClick={() => fileInputRefs.current[index]?.click()}
                                                    className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${slide.image_url ? 'opacity-0 group-hover/img:opacity-100' : 'opacity-100'}`}
                                                >
                                                    <div className="bg-white text-black px-4 py-2 rounded-full shadow-xl flex items-center gap-2 font-bold text-xs">
                                                        <Upload size={14} />
                                                        {slide.image_url ? 'Cambiar Imagen' : 'Subir Imagen'}
                                                    </div>
                                                </button>
                                                
                                                <input 
                                                    type="file" 
                                                    ref={el => { fileInputRefs.current[index] = el; }}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleFileUpload(index, file);
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-bold text-white/70">¿A qué servicio o página lleva?</label>
                                                    <div className="relative">
                                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                                                        <input 
                                                            type="text" 
                                                            value={slide.slug}
                                                            onChange={(e) => updateSlide(index, 'slug', e.target.value)}
                                                            className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pl-9 text-sm font-bold focus:border-pe-yellow outline-none"
                                                            placeholder="Ej: recargas, remesas o bancos"
                                                        />
                                                    </div>
                                                    
                                                    {/* Link Preview "For Dummies" */}
                                                    <div className="mt-2 p-2 bg-white/5 rounded-lg border border-white/5">
                                                        <p className="text-[10px] text-white/40 flex items-center gap-1.5">
                                                            <CheckCircle size={10} className="text-green-500" />
                                                            Al hacer clic irá a:
                                                        </p>
                                                        <p className="text-[10px] font-mono text-pe-yellow truncate mt-0.5">
                                                            {slide.slug ? (
                                                                slide.slug.startsWith('http') 
                                                                    ? slide.slug 
                                                                    : `${typeof window !== 'undefined' ? window.location.origin : ''}/${slide.slug.replace(/^\//, '')}`
                                                            ) : '(Sin destino configurado)'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            {/* Empty State / Call to action */}
                            {slides.length === 0 && (
                                <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/20">
                                    <ImageIcon size={48} className="mb-4" />
                                    <p className="text-lg font-medium">No hay banners configurados</p>
                                    <button onClick={addSlide} className="mt-4 text-pe-yellow hover:underline flex items-center gap-2">
                                        <Plus size={16} /> Añadir el primero
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {success && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 border border-white/20"
                    >
                        <CheckCircle size={24} />
                        <div>
                            <p className="font-bold">¡Cambios guardados!</p>
                            <p className="text-xs opacity-80">La web se ha actualizado correctamente.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
