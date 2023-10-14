import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'supplier', name: 'Fornecedores', icon: 'category', role: 'administrador' },
    { state: 'product', name: 'Produtos', icon: 'inventory_2', role: 'administrador' },
    { state: 'client', name: 'Clientes', icon: 'groups', role: 'administrador' },
    { state: 'mechanic', name: 'Mecânicos', icon: 'assignment_ind', role: 'administrador' },
    { state: 'order', name: 'Ordens de Serviços', icon: 'assignment_turned_in', role: '' },
    { state: 'bill', name: 'Serviços', icon: 'account_balance_wallet', role: '' }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}