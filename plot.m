clc;
close all;

from = csvread('from.txt');
to = csvread('to.txt');

%disp(from)

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};