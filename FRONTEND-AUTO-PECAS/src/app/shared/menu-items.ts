import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'supplier', name: 'Gerenciar Fornecedor', icon: 'category', role: 'administrador' },
    { state: 'product', name: 'Gerenciar Produto', icon: 'inventory_2', role: 'administrador' },
    { state: 'client', name: 'Gerenciar Cliente', icon: 'groups', role: 'administrador' }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}