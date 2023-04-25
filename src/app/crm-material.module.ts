import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'

const importExport = [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule]

@NgModule({
  declarations: [],
  imports: importExport,
  exports: importExport
})
export class CrmMaterialModule { }
