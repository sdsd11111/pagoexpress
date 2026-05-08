import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin-utils';
import { getHeroConfig, updateHeroConfig, getHeroSlides, updateHeroSlide, addHeroSlide, deleteHeroSlide } from '@/lib/chatbot/db';

export async function GET() {
    try {
        const config = await getHeroConfig();
        const slides = await getHeroSlides();
        return NextResponse.json({ config, slides });
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { h1, description, slides } = body;

        // 1. Update general config
        if (h1 !== undefined && description !== undefined) {
            await updateHeroConfig(h1, description);
        }

        // 2. Sync slides
        if (slides && Array.isArray(slides)) {
            const currentSlides = await getHeroSlides();
            const currentIds = currentSlides.map(s => s.id);
            const newIds = slides.map(s => s.id).filter(id => id !== undefined);

            // Delete removed slides
            for (const id of currentIds) {
                if (!newIds.includes(id)) {
                    await deleteHeroSlide(id);
                }
            }

            // Update or Add slides
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                if (slide.id) {
                    // Update existing
                    await updateHeroSlide(slide.id, slide.image_url, slide.slug);
                } else {
                    // Add new
                    await addHeroSlide(slide.image_url, slide.slug, i);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating hero data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
