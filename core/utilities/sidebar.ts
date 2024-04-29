// import { BehaviorSubject } from 'rxjs';
// import { SidebarField } from '@/types/sidebar';

// class SidebarService {
//   showSidebar: boolean = false; // Set initial value to false
//   formFields: SidebarField[] = [];
//   selectedFilters: any = {};

//   private selectedFilterSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
//   private formFieldsSubject: BehaviorSubject<SidebarField[]> = new BehaviorSubject<SidebarField[]>([]);
//   private sidebarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   formFieldsChanged = this.formFieldsSubject.asObservable();
//   selectedFiltersChanged = this.selectedFilterSubject.asObservable();
//   sidebarChanged = this.sidebarSubject.asObservable();

//   toggleSidebars(show: boolean): void {
//     this.showSidebar = show;
//     this.sidebarSubject.next(show);
//   }

//   setFormFields(fields: SidebarField[]): void {
//     this.formFields = fields;
//     this.formFieldsSubject.next(fields);
//   }

//   setSelectedFilters(data: any) {
//     this.selectedFilters = data;
//     this.selectedFilterSubject.next(this.selectedFilters);
//   }
  
//   getFormFields(): SidebarField[] { 
//     return this.formFields;
//   }

//   getSelectedFilters() {
//     return this.selectedFilters;
//   }

//   reset() {
//     this.selectedFilters = {};
//     this.formFields = [];

//     this.selectedFilterSubject.next(this.selectedFilters);
//     this.formFieldsSubject.next(this.formFields);
//   }

//   // Method to fetch the initial value of showSidebar
//   async getInitialShowSidebarValue(): Promise<boolean> {
//     return this.showSidebar;
//   }
// }

// const sidebarService = new SidebarService();
// export default sidebarService;
