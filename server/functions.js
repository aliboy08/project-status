function get_projects(){

    const projects = [];

    const folder_path = './data/projects';

    try {

        const files = fs.readdirSync(folder_path);
        
        for( const file of files ) {
            
            const file_data = fs.readFileSync(`${folder_path}/${file}`, 'utf8');

            const project_data = JSON.parse(file_data);

            projects.push({
                name: project_data.name,
                slug: project_data.slug,
            })
        }

    } catch (err) {
        console.error('Error reading directory synchronously:', err);
    }

    return projects;
}

export const server_functions = {
    get_projects,
}