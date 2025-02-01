import { ComponentType } from "@angular/cdk/portal";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

export const openCustomizeDialog = (dialog: MatDialog, component: ComponentType<unknown>, width: string, data: any): MatDialogRef<unknown, any> => {
    return dialog.open(component, {
      width: width,
      height: 'auto',
      backdropClass: 'dark-backdrop',
      data: data
    });
}