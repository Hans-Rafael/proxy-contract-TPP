import * as fs from "fs";
import * as path from "path";

const updateEnvFile = (key: string, value: string): void => {
    const envFilePath = path.resolve(__dirname, "../.env");

    if (!fs.existsSync(envFilePath)) {
        fs.writeFileSync(envFilePath, `${key}=${value}\n`);
        console.log(`Archivo .env creado con ${key}=${value}`);
    } else {
        const envContent = fs.readFileSync(envFilePath, "utf-8");
        const regex = new RegExp(`^${key}=.*`, "m");

        if (regex.test(envContent)) {
            const updatedEnvContent = envContent.replace(regex, `${key}=${value}`);
            fs.writeFileSync(envFilePath, updatedEnvContent);
            console.log(`Actualizado ${key} en el archivo .env`);
        } else {
            fs.appendFileSync(envFilePath, `${key}=${value}\n`);
            console.log(`Añadido ${key}=${value} al archivo .env`);
        }
    }
};

export default updateEnvFile;
