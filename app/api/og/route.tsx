import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse dynamic parameters (e.g., ?title=...)
    const title = searchParams.get('title') || 'Premium Coworking Spaces';
    const subtitle = searchParams.get('subtitle') || 'Vibhuti Khand, Gomti Nagar, Lucknow';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #110b29 0%, #1c1145 100%)',
            padding: '80px',
            fontFamily: 'sans-serif'
          }}
        >
          {/* Top Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#FF5B2E',
                letterSpacing: '3px'
              }}
            >
              NEOHUB COWORKING
            </span>
            <span
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500'
              }}
            >
              Lucknow\'s Premium Workspaces
            </span>
          </div>

          {/* Central Slogan/Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '40px',
              maxWidth: '900px'
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: '#ffffff',
                lineHeight: '1.2',
                margin: '0 0 20px 0'
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '26px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0'
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Info Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '30px',
              marginTop: '40px'
            }}
          >
            <div style={{ display: 'flex', gap: '30px' }}>
              <span style={{ fontSize: '18px', color: '#ffffff' }}>✓ Dual Fiber Internet</span>
              <span style={{ fontSize: '18px', color: '#ffffff' }}>✓ Power Backup 24/7</span>
              <span style={{ fontSize: '18px', color: '#ffffff' }}>✓ Premium Coffee</span>
            </div>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff'
              }}
            >
              neohubspaces.in
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    );
  } catch (error) {
    console.error('Failed to generate OG Image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
