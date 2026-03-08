export default {
    name: 'businessInfo',
    title: 'Información del Negocio',
    type: 'document',
    fields: [
        {
            name: 'email',
            title: 'Email de Contacto',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Teléfono Principal (Fijo o Móvil)',
            type: 'string',
        },
        {
            name: 'whatsapp',
            title: 'Número de WhatsApp (con código de país, ej. 56912345678)',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Dirección',
            type: 'string',
        },
        {
            name: 'schedule',
            title: 'Horarios (Agrega los bloques que necesites)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'days', title: 'Días (ej. "Lunes a Viernes" o "Sábado y Domingo")', type: 'string' },
                        { name: 'hours', title: 'Horas (ej. "09:00 - 18:00" o "Previa cita")', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'socialLinks',
            title: 'Redes Sociales',
            type: 'object',
            fields: [
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'tiktok', title: 'TikTok URL', type: 'url' },
            ],
        },
    ],
}
