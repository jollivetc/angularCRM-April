import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSelectModule} from '@angular/material/select'

const importExport = [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
                       MatIconModule, MatTooltipModule, MatSelectModule]

@NgModule({
  declarations: [],
  imports: importExport,
  exports: importExport
})
export class CrmMaterialModule { }
