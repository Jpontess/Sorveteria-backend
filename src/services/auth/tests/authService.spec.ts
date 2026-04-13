import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../../repository/login/user.repository.ts";
import { AuthService } from "../authService.ts";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");


const mockRepository = {
    findByUser: jest.fn(),
    create: jest.fn()
}as unknown as jest.Mocked<UserRepository>

describe("Test in Service Auth", () => {
    let service: AuthService;

    beforeEach( () => {
        service = new AuthService(mockRepository);
        jest.clearAllMocks();
    });

    describe("registerUsers", () => {
        it("deve criar usuário com senha hasheada quando nome não existe", async () =>{
            (mockRepository.findByUser as jest.Mock).mockResolvedValue(null);
            (mockRepository.create as jest.Mock).mockResolvedValue({id: 1, name: "joao01"});
            (bcrypt.hash as jest.Mock).mockResolvedValue("hash_De_Testes");

            const result = await service.registerUsers({
                name: "joao01",
                password: "123456",
            });

            expect(mockRepository.findByUser).toHaveBeenCalledWith("joao01");
            expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
            expect(mockRepository.create).toHaveBeenCalledWith({
                name: "joao01",
                password: "hash_De_Testes"
            });
            expect(result).toEqual({id: 1, name: "joao01"});
        });

        it("Isso deveria lançar um erro quando o usuário já existe", async () => {
            (mockRepository.findByUser as jest.Mock).mockResolvedValue({ name:"joao01"});

            await expect(
                service.registerUsers({name:"joao01", password: "123456"})
            ).rejects.toThrow("Usuário com nome joao01 já cadastrado.");

            expect(mockRepository.create).not.toHaveBeenCalled();
        });
    });

    describe("signIn", () => {
    it("deve retornar token JWT quando credenciais estão corretas", async () => {
        (mockRepository.findByUser as jest.Mock).mockResolvedValue({
            name: "joao01",
            password: "hashed_password",
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue("fake.jwt.token");

        const token = await service.singIn("joao01", "123456");

        expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed_password");
        expect(token).toBe("fake.jwt.token");
    });

    it("deve lançar erro quando usuário não existe", async () => {
        (mockRepository.findByUser as jest.Mock).mockResolvedValue(null);

        await expect(
            service.singIn("joao01", "123456")
        ).rejects.toThrow("Usuário não encontrado");
    });

    it("deve lançar erro quando senha está incorreta", async () => {
        (mockRepository.findByUser as jest.Mock).mockResolvedValue({
            name: "joao01",
            password: "hashed_password",
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(
            service.singIn("joao01", "senha_errada")
        ).rejects.toThrow("Senha está incorreta!");
    });
});
});