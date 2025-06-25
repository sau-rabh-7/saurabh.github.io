
import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const SecretAdmin: React.FC = () => {
  const { data, updatePersonalInfo, updateBackgroundSettings, updateSelectedPalette, updateMouseBlobSettings } = usePortfolio();
  const { primary, secondary, palettes, textOnPrimary, textOnSecondary } = useColorPalette();
  
  const [personalForm, setPersonalForm] = useState(data.personalInfo);
  const [backgroundForm, setBackgroundForm] = useState(data.backgroundSettings);
  const [mouseBlobForm, setMouseBlobForm] = useState(data.mouseBlobSettings);

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(personalForm);
    alert('Personal information updated!');
  };

  const handleBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBackgroundSettings(backgroundForm);
    alert('Background settings updated!');
  };

  const handleMouseBlobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMouseBlobSettings(mouseBlobForm);
    alert('Mouse blob settings updated!');
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-12"
      style={{ backgroundColor: primary, color: textOnPrimary }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1 
          className="text-4xl lg:text-5xl font-bold mb-12 text-center"
          style={{ color: secondary }}
        >
          Secret Admin Panel
        </h1>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList 
            className="grid w-full grid-cols-4"
            style={{ backgroundColor: `${secondary}20` }}
          >
            <TabsTrigger value="personal" style={{ color: textOnSecondary }}>Personal</TabsTrigger>
            <TabsTrigger value="background" style={{ color: textOnSecondary }}>Background</TabsTrigger>
            <TabsTrigger value="mouseblob" style={{ color: textOnSecondary }}>Mouse Blob</TabsTrigger>
            <TabsTrigger value="palette" style={{ color: textOnSecondary }}>Palette</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card 
              className="p-6"
              style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
            >
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div>
                  <Label style={{ color: textOnPrimary }}>Name</Label>
                  <Input
                    value={personalForm.name}
                    onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                    style={{ borderColor: `${secondary}50`, color: textOnPrimary }}
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Title</Label>
                  <Input
                    value={personalForm.title}
                    onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                    style={{ borderColor: `${secondary}50`, color: textOnPrimary }}
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Description</Label>
                  <Textarea
                    value={personalForm.description}
                    onChange={(e) => setPersonalForm({ ...personalForm, description: e.target.value })}
                    style={{ borderColor: `${secondary}50`, color: textOnPrimary }}
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Profile Photo URL</Label>
                  <Input
                    value={personalForm.profilePhoto}
                    onChange={(e) => setPersonalForm({ ...personalForm, profilePhoto: e.target.value })}
                    style={{ borderColor: `${secondary}50`, color: textOnPrimary }}
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Email</Label>
                  <Input
                    type="email"
                    value={personalForm.email}
                    onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                    style={{ borderColor: `${secondary}50`, color: textOnPrimary }}
                  />
                </div>
                
                <Button 
                  type="submit"
                  style={{ backgroundColor: secondary, color: textOnSecondary }}
                >
                  Save Personal Info
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="background">
            <Card 
              className="p-6"
              style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
            >
              <form onSubmit={handleBackgroundSubmit} className="space-y-6">
                <div>
                  <Label style={{ color: textOnPrimary }}>Speed: {backgroundForm.speed}</Label>
                  <Slider
                    value={[backgroundForm.speed]}
                    onValueChange={(value) => setBackgroundForm({ ...backgroundForm, speed: value[0] })}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Scale: {backgroundForm.scale}</Label>
                  <Slider
                    value={[backgroundForm.scale]}
                    onValueChange={(value) => setBackgroundForm({ ...backgroundForm, scale: value[0] })}
                    max={3}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Noise Intensity: {backgroundForm.noise}</Label>
                  <Slider
                    value={[backgroundForm.noise]}
                    onValueChange={(value) => setBackgroundForm({ ...backgroundForm, noise: value[0] })}
                    max={2}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Rotation: {backgroundForm.rotation}</Label>
                  <Slider
                    value={[backgroundForm.rotation]}
                    onValueChange={(value) => setBackgroundForm({ ...backgroundForm, rotation: value[0] })}
                    max={6.28}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Color</Label>
                  <Input
                    type="color"
                    value={backgroundForm.color}
                    onChange={(e) => setBackgroundForm({ ...backgroundForm, color: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <Button 
                  type="submit"
                  style={{ backgroundColor: secondary, color: textOnSecondary }}
                >
                  Save Background Settings
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="mouseblob">
            <Card 
              className="p-6"
              style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
            >
              <form onSubmit={handleMouseBlobSubmit} className="space-y-6">
                <div>
                  <Label style={{ color: textOnPrimary }}>Size: {mouseBlobForm.size}px</Label>
                  <Slider
                    value={[mouseBlobForm.size]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, size: value[0] })}
                    max={200}
                    min={20}
                    step={5}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Opacity: {mouseBlobForm.opacity}</Label>
                  <Slider
                    value={[mouseBlobForm.opacity]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, opacity: value[0] })}
                    max={1}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Blur: {mouseBlobForm.blur}px</Label>
                  <Slider
                    value={[mouseBlobForm.blur]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, blur: value[0] })}
                    max={50}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Border Radius: {mouseBlobForm.borderRadius}%</Label>
                  <Slider
                    value={[mouseBlobForm.borderRadius]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, borderRadius: value[0] })}
                    max={50}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Scale: {mouseBlobForm.scale}</Label>
                  <Slider
                    value={[mouseBlobForm.scale]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, scale: value[0] })}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label style={{ color: textOnPrimary }}>Animation Speed: {mouseBlobForm.animationSpeed}s</Label>
                  <Slider
                    value={[mouseBlobForm.animationSpeed]}
                    onValueChange={(value) => setMouseBlobForm({ ...mouseBlobForm, animationSpeed: value[0] })}
                    max={5}
                    min={0.5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <Button 
                  type="submit"
                  style={{ backgroundColor: secondary, color: textOnSecondary }}
                >
                  Save Mouse Blob Settings
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="palette">
            <Card 
              className="p-6"
              style={{ backgroundColor: `${secondary}10`, borderColor: `${secondary}30` }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: textOnPrimary }}>
                  Choose Color Palette
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {palettes.map((palette, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                        data.selectedPalette === index + 1 ? 'scale-105' : ''
                      }`}
                      style={{
                        backgroundColor: palette.primary,
                        borderColor: data.selectedPalette === index + 1 ? palette.secondary : 'transparent',
                      }}
                      onClick={() => updateSelectedPalette(index + 1)}
                    >
                      <div className="flex space-x-2 mb-2">
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: palette.secondary }}
                        />
                      </div>
                      <p className="text-sm" style={{ color: palette.secondary }}>
                        Palette {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecretAdmin;
