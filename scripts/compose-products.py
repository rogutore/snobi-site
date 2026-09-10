"""Reproducible placeholder composites from Noah's label exports and bag render.
Uses the explicitly requested Pillow technique; no generated product facts.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np
import io
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/Users/kishimakoto/Library/CloudStorage/GoogleDrive-rogutore@gmail.com/My Drive/Tokyo Coffee/Product Development　商品開発/SNOBI/sticker ideas/png')
PRODUCTS=[('peru','snobi-peru'),('col','snobi-colombia-huila'),('eth','snobi-ethiopia-guji'),('decaf','snobi-mexico-chiapas-decaf')]
base=Image.open(ROOT/'public/photos/snobi-bag.jpg').convert('RGBA')
# Hand-traced silhouette removes the concrete, beans and baked background shadow.
outline=[(319,955),(326,941),(325,868),(331,727),(345,538),(355,445),(360,432),(373,418),(784,362),(798,366),(805,380),(818,429),(830,506),(855,686),(878,899),(886,923),(882,934),(460,1027),(447,1021),(419,999),(397,983),(351,965)]
mask=Image.new('L',base.size);ImageDraw.Draw(mask).polygon(outline,fill=255);mask=mask.filter(ImageFilter.GaussianBlur(.7))
def coeffs(dst,src):
 matrix=[];values=[]
 for (x,y),(u,v) in zip(dst,src):
  matrix.extend([[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]);values.extend([u,v])
 return np.linalg.solve(np.array(matrix),np.array(values))
def savejpg(im,path,limit=250000):
 for quality in range(93,3,-3):
  stream=io.BytesIO();im.convert('RGB').save(stream,'JPEG',quality=quality,optimize=True,progressive=True)
  if len(stream.getvalue())<limit:
   path.write_bytes(stream.getvalue());return
 raise ValueError(path)
def stage(bag,size=1600,scale=1):
 canvas=Image.new('RGBA',(size,size),'#f7f5f0')
 height=round(size*.73*scale);item=bag.resize((round(bag.width*height/bag.height),height),Image.Resampling.LANCZOS)
 x=(size-item.width)//2;y=round(size*.86)-height
 shadow=Image.new('RGBA',canvas.size);d=ImageDraw.Draw(shadow);d.ellipse((x-20,y+height-55,x+item.width+50,y+height+25),fill=(68,56,80,30));shadow=shadow.filter(ImageFilter.GaussianBlur(28))
 canvas.alpha_composite(shadow);canvas.alpha_composite(item,(x,y));return canvas
bags=[]
for name,handle in PRODUCTS:
 label=Image.open(SOURCE/(name+'.png')).convert('RGB')
 label.resize((640,1440),Image.Resampling.LANCZOS).save(ROOT/'public/labels'/f'{handle}.webp',quality=88,method=6)
 # Match the four corners of the existing label exactly, avoiding a double border.
 dst=[(647,479),(799,461),(845,889),(687,913)]
 warped=label.convert('RGBA').transform(base.size,Image.Transform.PERSPECTIVE,coeffs(dst,[(0,0),(label.width,0),(label.width,label.height),(0,label.height)]),Image.Resampling.BICUBIC)
 # Warm the applied art to the lit bag surface, retaining its original hues.
 art=ImageEnhance.Brightness(warped).enhance(.92)
 bag=Image.alpha_composite(base,art);bag.putalpha(mask);bag=bag.crop((315,360,889,1030));bags.append(bag)
 for grams,scale in [(200,1),(100,.875)]:savejpg(stage(bag,scale=scale),ROOT/'public/products'/f'{handle}-{grams}g.jpg')
 bag.resize((514,600),Image.Resampling.LANCZOS).save(ROOT/'public/products'/f'{handle}-cutout.webp',quality=90,method=6)
 og=Image.new('RGB',(1200,630),'#f7f5f0');pack=stage(bag,size=700).convert('RGB');og.paste(pack,(-30,-35));mini=label.copy();mini.thumbnail((230,520));og.paste(mini,(790,55));savejpg(og,ROOT/'public/products'/f'{handle}-og.jpg')
lineup=Image.new('RGBA',(1800,850),'#f7f5f0')
for i,bag in enumerate(bags):
 item=bag.resize((489,571),Image.Resampling.LANCZOS)
 sh=Image.new('RGBA',lineup.size);ImageDraw.Draw(sh).ellipse((70+i*420,670,480+i*420,720),fill=(68,56,80,25));lineup.alpha_composite(sh.filter(ImageFilter.GaussianBlur(20)))
 lineup.alpha_composite(item,(18+i*420,135))
savejpg(lineup,ROOT/'public/products/chapter-one-lineup.jpg')
for name in ['DSCF1712','DSCF1754','snobi-brewing-1','snobi-brewing-2','237','032']:
 p=ROOT/'public/photos'/f'{name}.jpg'
 if p.exists() and p.stat().st_size>=400000:savejpg(Image.open(p),p,400000)
print('Composites and label derivatives ready; originals unchanged.')
