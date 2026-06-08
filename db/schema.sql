-- KOSKİGO PostgreSQL Schema

-- Roles: 'SUPER_ADMIN', 'MANAGER', 'PERSONNEL'
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'MANAGER', 'PERSONNEL');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'PERSONNEL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE wells (
    id SERIAL PRIMARY KEY,
    sira_no INTEGER,
    kuyu_adi TEXT NOT NULL,
    koordinat_google TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    qr_code_token TEXT UNIQUE,
    status TEXT DEFAULT 'ACTIVE',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fault_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id INTEGER REFERENCES wells(id),
    user_id UUID REFERENCES users(id),
    fault_type TEXT NOT NULL,
    description TEXT,
    media_urls TEXT[], -- URLs for photos/videos/audio
    is_synced BOOLEAN DEFAULT TRUE,
    local_id TEXT, -- For offline identification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for mapping performance
CREATE INDEX idx_wells_location ON wells(lat, lng);