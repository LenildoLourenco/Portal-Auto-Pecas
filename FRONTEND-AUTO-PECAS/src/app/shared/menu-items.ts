import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'supplier', name: 'Gerenciar Fornecedores', icon: 'category', role: 'administrador' },
    { state: 'product', name: 'Gerenciar Produtos', icon: 'inventory_2', role: 'administrador' },
    { state: 'client', name: 'Gerenciar Clientes', icon: 'groups', role: 'administrador' },
    { state: 'mechanic', name: 'Gerenciar Mecânicos', icon: 'assignment_ind', role: 'administrador' }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}