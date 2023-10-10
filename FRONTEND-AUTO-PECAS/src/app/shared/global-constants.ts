export class GlobalConstants {
    // Mensagem
    public static genericError: string = "Algo deu errado. Por favor, tente novamente mais tarde";

    public static unauthroized: string = "Você não está autorizado a acessar esta página";

    public static productExistError: string = "Produto já existe";

    public static productAdded: string = "Produto adicionado com sucesso";

    // Regex
    public static nameRegex: string = "[a-zA-Z0-9 ]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static contactNumberRegex: string = "^[e0-9]{10,10}$";

    // Variável
    public static error: string = "error";
}