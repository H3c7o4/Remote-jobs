export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_deactivated: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    updated_at: string;
    cover_image: string;
    profile_pic: string;
    profession: string;
    bio: string;
    phone_number: string;
    website: string;
    created_at: string;
    skills: string;
    resume: string;
    location: string;
    last_login: string;
}