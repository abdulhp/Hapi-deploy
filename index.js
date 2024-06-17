const Hapi = require('@hapi/hapi');
const supabase = require('@supabase/supabase-js');

(async () => {
    require('dotenv').config()

    const server = Hapi.server({host: 'localhost', port:3003});
    const db = supabase.createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PUBLIC_ANON_KEY
    )

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: () => ({message: 'you are doing get'})
        }
    ]);

    server.route([
        {
            method: 'GET',
            path: '/todos',
            handler: async function() {
                const { data, error } = await db
                    .from('todos')
                    .select()

                if(error) {
                    console.log(error)
                }

                return {
                    "status": 200,
                    "data": data
                }
            }
        }
    ]);

    await server.start();
    console.log('server start at ', server.info.uri)
})();