import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CategoriesService } from './categories.service';

@Module({
    controllers: [CategoriesController],
    providers: [SupabaseService, CategoriesService]
})
export class CategoriesModule {}
